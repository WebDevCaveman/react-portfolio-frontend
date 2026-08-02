"use client";

import * as React from "react";
import clsx from "clsx";
import { getPageRange, clampPage } from "./getPageRange";

export type PaginationVariant = "numbered" | "compact";
export type PaginationSize = "sm" | "md";

export interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** "numbered" = arrows + page buttons, "compact" = two circle buttons + label. */
  variant?: PaginationVariant;
  /** "md" = 40px controls (default), "sm" = 36px. Ignored by "compact". */
  size?: PaginationSize;
  /** Pages rendered on each side of the current one. Default 1. */
  siblingCount?: number;
  /** "Page N of M" caption. Defaults to true for "compact", false for "numbered". */
  showLabel?: boolean;
  formatLabel?: (page: number, totalPages: number) => string;
  className?: string;
}

const CONTROL_SIZE: Record<PaginationSize, string> = {
  md: "h-10 w-10 rounded-xl",
  sm: "h-9 w-9 rounded-[10px]",
};

const ICON_SIZE: Record<PaginationSize, number> = { md: 18, sm: 16 };

const CONTROL_BASE =
  "inline-flex items-center justify-center border transition-[color,border-color,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

const CONTROL_ENABLED =
  "border-border bg-surface text-text-secondary cursor-pointer hover:border-brand hover:text-brand";

const CONTROL_DISABLED =
  "border-border-subtle bg-bg-subtle text-text-muted cursor-not-allowed";

const PAGE_TEXT = "font-sans text-button font-semibold";

export function ChevronLeftIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M12 5l-5 5 5 5"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M8 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  size: PaginationSize;
  onClick: () => void;
}

/** Square prev/next arrow used by the numbered variant and TablePagination. */
export function PaginationArrow({ direction, disabled, size, onClick }: ArrowProps) {
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className={clsx(
        CONTROL_BASE,
        CONTROL_SIZE[size],
        "p-0",
        disabled ? CONTROL_DISABLED : CONTROL_ENABLED
      )}
    >
      <Icon size={ICON_SIZE[size]} />
    </button>
  );
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  variant = "numbered",
  size = "md",
  siblingCount = 1,
  showLabel,
  formatLabel = (p, t) => `Page ${p} of ${t}`,
  className,
}: PaginationProps) {
  const current = clampPage(page, totalPages);
  const atStart = current <= 1;
  const atEnd = current >= totalPages;
  const withLabel = showLabel ?? variant === "compact";

  const go = (next: number) => {
    const target = clampPage(next, totalPages);
    if (target !== current) onPageChange(target);
  };

  if (variant === "compact") {
    return (
      <nav
        aria-label="Pagination"
        className={clsx("flex items-center justify-center gap-6", className)}
      >
        <button
          type="button"
          disabled={atStart}
          onClick={() => go(current - 1)}
          aria-label="Previous page"
          className={clsx(
            "inline-flex h-12 w-12 items-center justify-center rounded-full p-0 transition-[transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
            atStart
              ? "bg-bg-subtle text-text-muted cursor-not-allowed"
              : "bg-surface text-text cursor-pointer shadow-[0_6px_16px_rgba(17,20,45,0.12)] hover:-translate-y-0.5 hover:shadow-md"
          )}
        >
          <ChevronLeftIcon />
        </button>

        {withLabel && (
          <span className="min-w-[120px] text-center font-display text-title font-semibold text-text">
            {formatLabel(current, totalPages)}
          </span>
        )}

        <button
          type="button"
          disabled={atEnd}
          onClick={() => go(current + 1)}
          aria-label="Next page"
          className={clsx(
            "inline-flex h-12 w-12 items-center justify-center rounded-full p-0 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
            atEnd
              ? "bg-bg-subtle text-text-muted cursor-not-allowed"
              : "bg-brand text-on-brand cursor-pointer shadow-brand hover:-translate-y-0.5"
          )}
        >
          <ChevronRightIcon />
        </button>
      </nav>
    );
  }

  return (
    <div className={clsx("flex flex-col gap-5", className)}>
      <nav aria-label="Pagination" className="flex flex-wrap items-center gap-2">
        <PaginationArrow
          direction="prev"
          disabled={atStart}
          size={size}
          onClick={() => go(current - 1)}
        />

        {getPageRange(current, totalPages, siblingCount).map((item, i) =>
          typeof item === "number" ? (
            <button
              key={item}
              type="button"
              onClick={() => go(item)}
              aria-current={item === current ? "page" : undefined}
              className={clsx(
                CONTROL_BASE,
                CONTROL_SIZE[size],
                PAGE_TEXT,
                item === current
                  ? "border-transparent bg-brand text-on-brand shadow-sm cursor-default"
                  : CONTROL_ENABLED
              )}
            >
              {item}
            </button>
          ) : (
            <span
              key={`${item}-${i}`}
              aria-hidden="true"
              className="inline-flex h-10 w-7 items-end justify-center pb-2 text-button font-semibold text-text-muted"
            >
              …
            </span>
          )
        )}

        <PaginationArrow
          direction="next"
          disabled={atEnd}
          size={size}
          onClick={() => go(current + 1)}
        />
      </nav>

      {withLabel && (
        <span className="text-caption-1 text-text-muted">
          {formatLabel(current, totalPages)}
        </span>
      )}
    </div>
  );
}
