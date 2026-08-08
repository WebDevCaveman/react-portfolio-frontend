import { Icon } from "../../components/Icon";
import type { Route } from "./+types/index";
import { Form } from "react-router";

const fieldClass =
  "rounded-xl border border-border bg-bg-subtle px-4 py-2.5 font-sans text-body text-text placeholder:text-text-muted transition-[color,border-color,box-shadow] duration-150 hover:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus";

const labelClass =
  "flex flex-col gap-2 text-caption-1 font-semibold text-text-secondary";

const ContactPage = () => {
  return (
    <div className="py-8">
      <p className="text-caption-1 font-semibold uppercase tracking-widest text-brand">
        Contact
      </p>
      <h1 className="mt-3 font-display text-h3 font-bold text-text">
        Say hello.
      </h1>
      <p className="mt-5 max-w-2xl text-title text-text-secondary">
        Got a project, a question, or just want to swap notes on design systems?
        Drop a line.
      </p>

      <section className="mt-10 max-w-2xl rounded-[18px] bg-surface p-8 shadow-sm">
        <form
          className="flex flex-col gap-5"
          action="https://formspree.io/f/xnpajzko"
          method="post"
        >
          <label className={labelClass}>
            Full name
            <input
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Ada Lovelace"
              required
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            Email
            <input
              id="email"
              type="email"
              name="email"
              placeholder="ada@example.com"
              required
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            Subject
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="What's this about?"
              required
              className={fieldClass}
            />
          </label>

          <label className={labelClass}>
            Message
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me a bit more…"
              required
              className={`${fieldClass} resize-y`}
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-sans text-button font-semibold text-on-brand transition-[background-color,box-shadow] duration-150 hover:bg-brand-hover hover:shadow-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer"
          >
            <Icon name="mail" size={18} />
            Send message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
