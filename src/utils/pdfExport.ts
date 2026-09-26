 import { toCanvas } from "html-to-image";
import jsPDF from "jspdf";
import { formatUrl } from "./urlUtils";

/**
 * High-fidelity PDF export supporting modern CSS (oklch, lab, modern Tailwind v4, gradients, flex/grid)
 * AND interactive clickable hyperlinks for LinkedIn, GitHub, websites, email, and project links.
 *
 * Uses html-to-image to render the vector canvas while preserving all CSS styling,
 * then maps DOM link elements (a[href]) to native PDF interactive link annotations (pdf.link).
 */
export async function exportToPdf(elementId: string, fileName: string = "Portfolio_Resume.pdf"): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Resume preview element #${elementId} not found`);
  }

  // Measure exact element dimensions
  const originalWidth = element.offsetWidth;
  const originalHeight = element.offsetHeight;

  const pdfPageWidth = 210;
  const pdfPageHeight = 297;

  // Extract clickable links and calculate exact coordinates relative to the resume canvas
  const containerRect = element.getBoundingClientRect();
  const scaleRatio = pdfPageWidth / containerRect.width;

  interface LinkAnnotation {
    xMm: number;
    yMm: number;
    wMm: number;
    hMm: number;
    url: string;
  }

  const linkAnnotations: LinkAnnotation[] = [];
  const anchorElements = Array.from(element.querySelectorAll("a[href]")) as HTMLAnchorElement[];

  for (const anchor of anchorElements) {
    if (anchor.closest(".no-print")) continue;

    const rawHref = anchor.getAttribute("href") || anchor.href;
    const url = formatUrl(rawHref);
    if (!url || url === "#" || url.startsWith("javascript:")) continue;

    // Check visibility
    const computedStyle = window.getComputedStyle(anchor);
    if (
      computedStyle.display === "none" ||
      computedStyle.visibility === "hidden" ||
      parseFloat(computedStyle.opacity) === 0
    ) {
      continue;
    }

    const rawRects = anchor.getClientRects();
    const rectList = rawRects.length > 0 ? Array.from(rawRects) : [anchor.getBoundingClientRect()];

    for (const rect of rectList) {
      if (rect.width <= 0 || rect.height <= 0) continue;

      const xMm = (rect.left - containerRect.left) * scaleRatio;
      const yMm = (rect.top - containerRect.top) * scaleRatio;
      const wMm = rect.width * scaleRatio;
      const hMm = rect.height * scaleRatio;

      if (wMm > 0.1 && hMm > 0.1) {
        linkAnnotations.push({
          xMm,
          yMm,
          wMm,
          hMm,
          url,
        });
      }
    }
  }

  // Render to canvas using native browser engine
  const canvas = await toCanvas(element, {
    pixelRatio: 2, // 2x for sharp print quality
    backgroundColor: "#ffffff",
    cacheBust: false,
    skipFonts: true,
    width: originalWidth,
    height: originalHeight,
    filter: (node) => {
      if (node instanceof HTMLElement && node.classList.contains("no-print")) {
        return false;
      }
      return true;
    },
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.98);
  const imgWidthMm = pdfPageWidth;
  const imgHeightMm = (canvas.height * pdfPageWidth) / canvas.width;

  let heightLeftMm = imgHeightMm;
  let currentYOffset = 0;

  // Render first page
  pdf.addImage(imgData, "JPEG", 0, currentYOffset, imgWidthMm, imgHeightMm, undefined, "FAST");
  heightLeftMm -= pdfPageHeight;

  // Render subsequent pages if content spans across multiple A4 pages
  while (heightLeftMm > 2) {
    currentYOffset -= pdfPageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, currentYOffset, imgWidthMm, imgHeightMm, undefined, "FAST");
    heightLeftMm -= pdfPageHeight;
  }

  const totalPages = pdf.getNumberOfPages();

  // Attach clickable link annotations to their corresponding pages
  for (const link of linkAnnotations) {
    const yStartMm = link.yMm;
    const yEndMm = link.yMm + link.hMm;

    const startPage = Math.floor(yStartMm / pdfPageHeight) + 1;
    const endPage = Math.floor((yEndMm - 0.001) / pdfPageHeight) + 1;

    for (let page = startPage; page <= Math.min(endPage, totalPages); page++) {
      const pageTopMm = (page - 1) * pdfPageHeight;
      const pageBottomMm = page * pdfPageHeight;

      const sliceTopMm = Math.max(yStartMm, pageTopMm);
      const sliceBottomMm = Math.min(yEndMm, pageBottomMm);
      const sliceHeightMm = sliceBottomMm - sliceTopMm;
      const yOnPageMm = sliceTopMm - pageTopMm;

      if (sliceHeightMm > 0.1) {
        pdf.setPage(page);
        pdf.link(link.xMm, yOnPageMm, link.wMm, sliceHeightMm, { url: link.url });
      }
    }
  }

  pdf.save(fileName);
}

/**
 * Triggers standard browser print/save-as-PDF dialog.
 */
export function printResume(): void {
  window.print();
}
