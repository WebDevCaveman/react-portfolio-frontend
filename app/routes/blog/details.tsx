import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import type { Route } from "./+types/details";
import type { PostMeta, StrapiPost, StrapiResponse } from "~/types";
import { Icon } from "~/components/Icon";

const API_URL = import.meta.env.VITE_API_URL;

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  // Post pobieramy po slugu, a nie po documentId - route to /blog/:slug. Strapi nie ma
  // endpointu "po slugu", wiec filtrujemy kolekcje: zawsze dostajemy tablice (0 lub 1 element).
  const res = await fetch(
    `${API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const json: StrapiResponse<StrapiPost> = await res.json();
  const item = json.data[0];

  if (!item) {
    throw new Response(`Post with slug "${slug}" not found`, { status: 404 });
  }

  // body ze Strapi to markdown - renderuje go ReactMarkdown, tak jak wczesniej pliki .md
  const post: PostMeta = {
    ...item,
    readingTime: item.readingMinutes,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  };

  return { post };
}

// loaderData jest undefined, gdy loader rzuci blad i wejdzie ErrorBoundary
export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Post not found — Dev Portfolio" }];
  return [
    { title: `${loaderData.post.title} — Dev Portfolio` },
    { name: "description", content: loaderData.post.excerpt },
  ];
}

// ponytail: stylowanie markdowna wariantami Tailwinda zamiast @tailwindcss/typography
// — posty uzywaja tylko p / h2 / inline code. Dodaj plugin, gdy dojda tabele i listy.
const proseClass = [
  "text-body text-text-secondary",
  "[&>p]:mt-5",
  "[&>h2]:mt-10 [&>h2]:font-display [&>h2]:text-h5 [&>h2]:font-semibold [&>h2]:text-text",
  "[&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-hover",
  "[&_code]:rounded-md [&_code]:bg-bg-subtle [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-caption-1 [&_code]:text-text",
  "[&_strong]:font-semibold [&_strong]:text-text",
].join(" ");

const BlogDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { post } = loaderData;

  return (
    <div className="py-8">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-md text-caption-1 font-semibold text-text-secondary transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        <Icon name="arrow-left" size={16} />
        Back to blog
      </Link>

      <article className="mt-6 max-w-3xl overflow-hidden rounded-[18px] bg-surface shadow-sm">
        <img
          src={post.image}
          alt={post.title}
          className="aspect-video w-full object-cover"
        />

        <div className="p-8 md:p-10">
          <div className="flex items-center gap-2 text-caption-1 font-medium text-text-muted">
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
          <h1 className="mt-3 font-display text-h4 font-bold text-text">
            {post.title}
          </h1>
          <p className="mt-4 text-title text-text-secondary">{post.excerpt}</p>

          <hr className="mt-8 border-border-subtle" />

          <div className={proseClass}>
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailsPage;
