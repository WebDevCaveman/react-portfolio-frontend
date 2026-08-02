import { Icon } from "~/components/Icon";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const buttonBase =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-caption-1 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:cursor-not-allowed disabled:opacity-40";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // ponytail: pelna lista stron, bez wielokropka - przy kilkunastu stronach dodac skracanie
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${buttonBase} bg-surface text-text-secondary shadow-sm hover:text-brand`}
      >
        <Icon name="chevron-left" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`${buttonBase} ${
            page === currentPage
              ? "bg-brand text-on-brand"
              : "bg-surface text-text-secondary shadow-sm hover:text-brand"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${buttonBase} bg-surface text-text-secondary shadow-sm hover:text-brand`}
      >
        <Icon name="chevron-right" />
      </button>
    </nav>
  );
};

export default Pagination;
