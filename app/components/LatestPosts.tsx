import type { PostMeta } from "~/types";
import PostCard from "./PostCard";

type LatestPostsProps = {
  posts: PostMeta[];
  count?: number;
};

const LatestPosts = ({ posts, count = 2 }: LatestPostsProps) => {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);

  return (
    <div className="py-8">
      <p className="text-caption-1 font-semibold uppercase tracking-widest text-brand">
        Latest Posts
      </p>
      <h1 className="mt-3 font-display text-h3 font-bold text-text">
        From the blog
      </h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {latestPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
