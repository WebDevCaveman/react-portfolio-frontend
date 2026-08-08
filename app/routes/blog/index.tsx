import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta, StrapiPost, StrapiResponse } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostsFilter from "~/components/PostsFilter";
import { AnimatePresence, motion } from "motion/react";

const API_URL = import.meta.env.VITE_API_URL;

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const res = await fetch(`${API_URL}/posts?populate=image&sort=date:desc`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts metadata");
  }

  const json: StrapiResponse<StrapiPost> = await res.json();
  const posts = json.data.map((item: StrapiPost) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    body: item.body,
    readingTime: item.readingMinutes,
    date: item.date,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  }));

  return { posts };
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

      {/* ta sama animacja co na /projects - opis dzialania w routes/projects/index.tsx */}
      {currentPosts.length === 0 ? (
        <p className="mt-10 text-body text-text-secondary">
          No posts match “{query}”.
        </p>
      ) : (
        <div className="relative mt-6 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {currentPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
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
