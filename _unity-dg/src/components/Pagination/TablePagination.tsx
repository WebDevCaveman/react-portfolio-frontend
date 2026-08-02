"use client";

import * as React from "react";
import clsx from "clsx";
import { PaginationArrow } from "./Pagination";
import { clampPage } from "./getPageRange";

export interface TablePaginationProps {
  /** Current page, 1-based. */
  page: number;
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  /** Omit to hide the rows-per-page selector. */
  onRowsPerPageChange?: (rows: number) => void;
  rowsOptions?: number[];
  formatRange?: (from: number, to: number, total: number) => string;
  className?: string;
}

export function TablePagination({
  page,
  totalItems,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsOptions = [10, 25, 50],
  formatRange = (from, to, total) => `Showing ${from}–${to} of ${total} results`,
  className,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const current = clampPage(page, totalPages);
  const from = totalItems === 0 ? 0 : (current - 1) * rowsPerPage + 1;
  const to = Math.min(totalItems, current * rowsPerPage);

  const go = (next: number) => {
    const target = clampPage(next, totalPages);
    if (target !== current) onPageChange(target);
  };

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-between gap-6 rounded-[14px] border border-border-subtle bg-surface-sunken px-[22px] py-[18px]",
        className
      )}
    >
      <div className="text-body text-text-secondary">
        {formatRange(from, to, totalItems)}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        {onRowsPerPageChange && (
          <div className="flex items-center gap-2.5">
            <span className="text-caption-1 text-text-muted">Rows</span>
            <div className="inline-flex gap-1 rounded-xl border border-border-subtle bg-surface p-1">
              {rowsOptions.map((rows) => {
                const active = rows === rowsPerPage;
                return (
                  <button
                    key={rows}
                    type="button"
                    aria-pressed={active}
                    onClick={() => !active && onRowsPerPageChange(rows)}
                    className={clsx(
                      "inline-flex h-7 items-center justify-center rounded-lg px-3 font-sans text-caption-1 font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                      active
                        ? "bg-brand text-on-brand cursor-default"
                        : "bg-transparent text-text-secondary cursor-pointer hover:text-text"
                    )}
                  >
                    {rows}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <PaginationArrow
            direction="prev"
            disabled={current <= 1}
            size="sm"
            onClick={() => go(current - 1)}
          />
          <span className="min-w-16 text-center text-caption-1 font-semibold text-text">
            {current} / {totalPages}
          </span>
          <PaginationArrow
            direction="next"
            disabled={current >= totalPages}
            size="sm"
            onClick={() => go(current + 1)}
          />
        </div>
      </div>
    </div>
  );
}
