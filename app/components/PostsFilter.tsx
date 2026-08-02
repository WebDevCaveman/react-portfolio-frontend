import { Icon } from "~/components/Icon";

type PostsFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

// ponytail: filtr tekstowy, nie kategorie - PostMeta nie ma pola category.
// Zamien na przyciski w stylu CategoryFilter, gdy posty dostana kategorie.
const PostsFilter = ({ value, onChange }: PostsFilterProps) => {
  return (
    <div className="relative mt-8 max-w-md">
      <Icon
        name="search"
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts…"
        aria-label="Search posts"
        className="w-full rounded-xl border border-border bg-bg-subtle py-2.5 pl-11 pr-4 font-sans text-body text-text placeholder:text-text-muted transition-[color,border-color,box-shadow] duration-150 hover:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      />
    </div>
  );
};

export default PostsFilter;
