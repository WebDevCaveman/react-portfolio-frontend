import { Link } from "react-router";
import { Icon } from "./Icon";

// ponytail: treść i zdjęcie na sztywno — wystarczy dla jednego portfolio.
// Jeśli Header trafi na drugą stronę, wtedy propsy.
const Header = () => {
  return (
    <section className="flex flex-col items-center gap-8 py-12 text-center md:flex-row md:gap-12 md:text-left bg-blue-50 dark:bg-surface-sunken justify-center">
      <img
        src="/profile.png"
        alt="Krzysztof"
        className="h-40 w-40 shrink-0 rounded-full object-cover shadow-soft ring-4 ring-surface"
      />

      <div>
        <h1 className="font-display text-h3 font-bold text-text">
          Hi, I'm Krzysztof.
        </h1>
        <p className="mt-4 max-w-xl text-title text-text-secondary">
          Full-stack developer building friendly, fast interfaces with React and
          TypeScript — from design tokens all the way to production screens.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-button font-semibold text-on-brand shadow-brand transition-colors hover:bg-brand-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-focus"
          >
            View projects
            <Icon name="arrow-right" size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-button font-semibold text-text transition-colors hover:border-brand hover:text-brand focus:outline-none focus-visible:ring-4 focus-visible:ring-focus"
          >
            <Icon name="mail" size={18} />
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
