import { useState } from "react";
import { NavLink } from "react-router";
import { Icon } from "./Icon";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-3 py-2 text-body font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
    isActive ? "bg-brand-subtle text-brand" : "text-text-secondary hover:text-brand"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-surface">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-display text-title font-bold text-on-brand shadow-brand">
            K
          </span>
          <span className="font-display text-title font-semibold text-text">
            WebDevCaveman
          </span>
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-lg text-text-secondary transition-colors hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus md:hidden"
        >
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="flex flex-col gap-1 border-t border-border-subtle px-6 py-3 md:hidden"
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
