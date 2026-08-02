type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          aria-pressed={category === selectedCategory}
          className={`rounded-full px-4 py-2 text-caption-1 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer ${
            category === selectedCategory
              ? "bg-brand text-on-brand"
              : "bg-surface text-text-secondary shadow-sm hover:text-brand"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
