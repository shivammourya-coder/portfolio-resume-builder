/**
 * URL utility functions for normalizing links and displaying readable link text.
 */

/**
 * Normalizes a URL to ensure it has a valid protocol (http, https, mailto, tel).
 * Prevents relative URL misinterpretation by browsers and PDF viewers.
 */
export function formatUrl(url: string | null | undefined): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // Already has supported protocol
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }

  // Check if it's an email address
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return `mailto:${trimmed}`;
  }

  // Check if it's a telephone number
  if (/^\+?[\d\s\-()]{7,}$/.test(trimmed)) {
    return `tel:${trimmed.replace(/\s+/g, "")}`;
  }

  // Default to https for web domains
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

/**
 * Strips http://, https://, www., and trailing slashes for clean display text in templates.
 */
export function formatDisplayUrl(url: string | null | undefined): string {
  if (!url) return "";
  return url
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}
