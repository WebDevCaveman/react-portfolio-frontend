import { Link } from "react-router";
import type { PostMeta } from "~/types";

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-[18px] bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
    >
      <time
        dateTime={post.date}
        className="text-caption-1 font-medium text-text-muted"
      >
        {new Date(post.date).toLocaleDateString("en-EN")}
      </time>
      <h2 className="mt-2 line-clamp-1 font-display text-h6 font-semibold text-text transition-colors group-hover:text-brand">
        {post.title}
      </h2>
      {/* ponytail: staly blok 2 linii, zeby karty w wierszu mialy te sama wysokosc */}
      <p className="mt-2 line-clamp-2 min-h-11 flex-1 text-body text-text-secondary">
        {post.excerpt}
      </p>
      <span className="mt-4 text-caption-1 font-semibold text-brand">
        Read more →
      </span>
    </Link>
  );
};

export default PostCard;
