import { Link } from "react-router";
import type { Project } from "~/types";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-[18px] bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-info px-3 py-1 text-caption-1 font-medium text-white">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="line-clamp-1 font-display text-h6 font-semibold text-text transition-colors group-hover:text-brand">
          {project.title}
        </h2>
        {/* ponytail: staly blok 2 linii (2 x 22px), zeby wszystkie karty mialy te sama wysokosc */}
        <p className="mt-2 line-clamp-2 min-h-11 flex-1 text-body text-text-secondary">
          {project.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-caption-1 text-text-muted">
          <span className="rounded-full bg-brand-subtle px-3 py-1 font-medium text-brand">
            {project.category}
          </span>
          <time dateTime={project.date}>
            {new Date(project.date).toLocaleDateString("en-EN")}
          </time>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
