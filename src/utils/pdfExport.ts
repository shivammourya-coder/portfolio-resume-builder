import { toCanvas } from "html-to-image";
import jsPDF from "jspdf";

/**
 * High-fidelity PDF export supporting modern CSS (oklch, lab, modern Tailwind v4, gradients, flex/grid).
 * Uses html-to-image which renders via the browser's native SVG foreignObject engine,
 * avoiding outdated regex-based color parsing errors from older libraries.
 */
export async function exportToPdf(elementId: string, fileName: string = "Portfolio_Resume.pdf"): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Resume preview element #${elementId} not found`);
  }

  // Measure exact element dimensions
  const originalWidth = element.offsetWidth;
  const originalHeight = element.offsetHeight;

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

  const pdfPageWidth = 210;
  const pdfPageHeight = 297;

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

  pdf.save(fileName);
}

/**
 * Triggers standard browser print/save-as-PDF dialog.
 */
export function printResume(): void {
  window.print();
}
