import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";
import { Icon } from "~/components/Icon";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  const url = new URL("/posts-meta.json", request.url);
  const response = await fetch(url.href);
  if (!response.ok) {
    throw new Error("Failed to fetch posts metadata");
  }

  const allPostsMeta = (await response.json()) as PostMeta[];
  const postMeta = allPostsMeta.find((post) => post.slug === slug);

  if (!postMeta) {
    throw new Response(`Post with slug "${slug}" not found`, { status: 404 });
  }

  // Skoro mamy powyzej pobrany dany post to na jego podstawie musimy teraz dynamicznie pobrac dane z odpowiedniego pliki Markdown, ktory potem przekształcimy sobie na kod HTML. W tym przypadku musimy użyć dynamicznego importu, aby pobrać plik Markdown na podstawie slug. W tym przypadku używamy składni `import()` z szablonem string, aby wskazać ścieżkę do pliku Markdown. Dodatkowo dodajemy `?raw`, aby pobrać zawartość pliku jako surowy tekst, a nie jako moduł JavaScript.
  const markdown = await import(`../../posts/${slug}.md?raw`);
  return { postMeta, markdown: markdown.default };
}

// loaderData jest undefined, gdy loader rzuci blad i wejdzie ErrorBoundary
export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [{ title: "Post not found — Dev Portfolio" }];
  return [
    { title: `${loaderData.postMeta.title} — Dev Portfolio` },
    { name: "description", content: loaderData.postMeta.excerpt },
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
  const { postMeta, markdown } = loaderData;

  return (
    <div className="py-8">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-md text-caption-1 font-semibold text-text-secondary transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        <Icon name="arrow-left" size={16} />
        Back to blog
      </Link>

      <article className="mt-6 max-w-3xl rounded-[18px] bg-surface p-8 shadow-sm md:p-10">
        <time
          dateTime={postMeta.date}
          className="text-caption-1 font-medium text-text-muted"
        >
          {new Date(postMeta.date).toLocaleDateString("en-EN")}
        </time>
        <h1 className="mt-3 font-display text-h4 font-bold text-text">
          {postMeta.title}
        </h1>
        <p className="mt-4 text-title text-text-secondary">
          {postMeta.excerpt}
        </p>

        <hr className="mt-8 border-border-subtle" />

        <div className={proseClass}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailsPage;
