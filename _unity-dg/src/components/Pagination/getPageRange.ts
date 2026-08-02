/**
 * Builds the page list for a numbered pagination control.
 * Returns page numbers plus "gapL" / "gapR" markers where the range collapses.
 *
 * getPageRange(3, 12)  -> [1, 2, 3, 4, "gapR", 12]
 * getPageRange(6, 12)  -> [1, "gapL", 5, 6, 7, "gapR", 12]
 * getPageRange(12, 12) -> [1, "gapL", 9, 10, 11, 12]
 */
export type PageRangeItem = number | "gapL" | "gapR";

export function getPageRange(
  page: number,
  totalPages: number,
  siblingCount = 1
): PageRangeItem[] {
  const windowSize = siblingCount * 2 + 1;
  const maxSimple = windowSize + 4;

  if (totalPages <= maxSimple) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: PageRangeItem[] = [1];

  let start = Math.max(2, page - siblingCount);
  let end = Math.min(totalPages - 1, page + siblingCount);

  if (page - siblingCount <= 2) {
    start = 2;
    end = Math.min(totalPages - 1, windowSize + 1);
  }
  if (page + siblingCount >= totalPages - 1) {
    start = Math.max(2, totalPages - windowSize);
    end = totalPages - 1;
  }

  if (start > 2) items.push("gapL");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < totalPages - 1) items.push("gapR");

  items.push(totalPages);
  return items;
}

export function clampPage(page: number, totalPages: number): number {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}
