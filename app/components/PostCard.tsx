import { Link } from "react-router";
import type { PostMeta } from "~/types";
import { Icon } from "~/components/Icon";

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[18px] bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
    >
      <img
        src={post.image}
        alt={post.title}
        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="flex flex-1 flex-col p-6">
        <h2 className="line-clamp-1 font-display text-h6 font-semibold text-text transition-colors group-hover:text-brand">
          {post.title}
        </h2>
        {/* ponytail: staly blok 2 linii, zeby karty w wierszu mialy te sama wysokosc */}
        <p className="mt-2 line-clamp-2 min-h-11 flex-1 text-body text-text-secondary">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-caption-1">
          <div className="flex items-center gap-2 text-text-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-EN")}
            </time>
            {post.readingTime ? (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="clock" size={14} />
                  {post.readingTime} min read
                </span>
              </>
            ) : null}
          </div>
          <span className="font-semibold text-brand">Read more →</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
