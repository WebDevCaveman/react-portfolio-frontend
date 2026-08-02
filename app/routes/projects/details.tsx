// W tym przypadku, dla nauki wykorzystujemy Client Loader i pobieramy dane na froncie. W praktyce, w przypadku projektow produkcyjnych, powinnismy korzystac z Server Loader, aby pobrac dane z backendu i przekazac je do komponentu. Ale skoro jesteśmy na froncie musimy zadbac o sprawdzenie poprawnosci odpowiedzi if (!res.ok) oraz o dodanie loadera, ktory bedzie wyswietlany gdy bedziemy pobierac dane. W przypadku Server Loader nie musimy sie o to martwic.
import { Link } from "react-router";
import type { Route } from "./+types/details";
import type { Project } from "~/types";
import { Icon } from "~/components/Icon";

const API_URL = import.meta.env.VITE_API_URL;

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`${API_URL}/projects/${params.id}`);
  if (!res.ok) {
    throw new Response("Project not found", { status: 404 });
  }
  const project: Project = await res.json();
  return project;
}

export function HydrateFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-caption-1 font-semibold uppercase tracking-widest text-brand">
        Loading project details...
      </p>
    </div>
  );
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData as Project;
  return (
    <div className="py-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 rounded-md text-caption-1 font-medium text-text-secondary transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        <Icon name="arrow-left" />
        Back to projects
      </Link>

      <article className="mt-6 overflow-hidden rounded-[18px] bg-surface shadow-sm">
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="aspect-video max-h-105 w-full object-cover"
          />
          {project.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-info px-3 py-1 text-caption-1 font-medium text-white">
              Featured
            </span>
          )}
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between text-caption-1 text-text-muted">
            <span className="rounded-full bg-brand-subtle px-3 py-1 font-medium text-brand">
              {project.category}
            </span>
            <time dateTime={project.date}>
              {new Date(project.date).toLocaleDateString("en-EN")}
            </time>
          </div>

          <h1 className="mt-5 font-display text-h4 font-bold text-text">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-title text-text-secondary">
            {project.description}
          </p>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-body font-medium text-on-brand transition-colors hover:bg-brand-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Visit project
            <Icon name="external-link" />
          </a>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetailsPage;
