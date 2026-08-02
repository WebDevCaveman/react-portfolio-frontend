import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostsFilter from "~/components/PostsFilter";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);
  const response = await fetch(url.href);
  if (!response.ok) {
    throw new Error("Failed to fetch posts metadata");
  }
  const data = await response.json();
  data.sort((a: PostMeta, b: PostMeta) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const postsPerPage = 4;

  const search = query.trim().toLowerCase();
  const filteredPosts = search
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.excerpt.toLowerCase().includes(search),
      )
    : posts;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const lastPostIndex = currentPage * postsPerPage;
  const currentPosts = filteredPosts.slice(
    lastPostIndex - postsPerPage,
    lastPostIndex,
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="py-8">
      <p className="text-caption-1 font-semibold uppercase tracking-widest text-brand">
        Blog
      </p>
      <h1 className="mt-3 font-display text-h3 font-bold text-text">
        Notes from the workbench.
      </h1>

      <PostsFilter value={query} onChange={handleQueryChange} />

      {currentPosts.length === 0 ? (
        <p className="mt-10 text-body text-text-secondary">
          No posts match “{query}”.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* ponytail: Pagination sam zwraca null przy jednej stronie */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BlogPage;
