import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { Icon } from "./components/Icon";
import Navbar from "./components/Navbar";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap",
  },
];

// To doda nam te metatagi domyślnie dla kazdej strony, oczywiscie mozemy je sobie nadpisac dodajac je osobno na kzdej ze stron
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Portfolio" },
    {
      name: "description",
      content: "Simple & Friendly Dev Portfolio build with React",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let code = "500";
  let message = "Something went wrong";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    code = String(error.status);
    message = error.status === 404 ? "Page not found" : "Error";
    details =
      error.status === 404
        ? "The page you're looking for doesn't exist or has been moved."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-xl rounded-[18px] bg-surface shadow-md px-8 py-14 text-center">
        <p className="font-display font-bold text-d2 text-brand">{code}</p>
        <h1 className="mt-4 font-display font-semibold text-h4 text-text">
          {message}
        </h1>
        <p className="mt-3 text-body text-text-secondary">{details}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-button font-semibold text-on-brand shadow-brand hover:bg-brand-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-focus"
        >
          <Icon name="arrow-left" size={18} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
