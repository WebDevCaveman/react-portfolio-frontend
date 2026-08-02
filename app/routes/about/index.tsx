import { Icon, type IconName } from "../../components/Icon";

const stack = [
  "TypeScript",
  "React",
  "React Router",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
];

const links: { name: IconName; label: string; href: string }[] = [
  { name: "github", label: "GitHub", href: "https://github.com/WebDevCaveman" },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/krzysztof-piekarz-987642168/",
  },
  { name: "mail", label: "Email", href: "mailto:krzysztof@webdevcaveman.com" },
];

const AboutPage = () => {
  return (
    <div className="py-8">
      <p className="text-caption-1 font-semibold uppercase tracking-widest text-brand">
        About
      </p>
      <h1 className="mt-3 font-display text-h3 font-bold text-text">
        Building friendly things for the web.
      </h1>
      <p className="mt-5 max-w-2xl text-title text-text-secondary">
        I'm a developer who likes small, sharp interfaces and code that's still
        readable at 3am. Most of my work sits between design systems and the
        product screens that consume them.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-[18px] bg-surface p-8 shadow-sm">
          <h2 className="font-display text-h6 font-semibold text-text">
            Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-full bg-brand-subtle px-3 py-1.5 text-caption-1 font-medium text-brand"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[18px] bg-surface p-8 shadow-sm">
          <h2 className="font-display text-h6 font-semibold text-text">
            Elsewhere
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-3 rounded-md text-body text-text-secondary transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={link.name} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
