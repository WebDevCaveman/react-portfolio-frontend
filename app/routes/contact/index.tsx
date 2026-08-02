import { Icon } from "../../components/Icon";
import type { Route } from "./+types/index";
import { Form } from "react-router";

const fieldBase =
  "rounded-xl border bg-bg-subtle px-4 py-2.5 font-sans text-body text-text placeholder:text-text-muted transition-[color,border-color,box-shadow] duration-150 focus:outline-none focus-visible:ring-2";

const fieldClass = (error?: string) =>
  `${fieldBase} ${
    error
      ? "border-danger text-danger placeholder:text-danger/60 focus-visible:ring-danger"
      : "border-border hover:border-brand focus-visible:ring-focus"
  }`;

const labelClass =
  "flex flex-col gap-2 text-caption-1 font-semibold text-text-secondary";

const FieldError = ({ id, error }: { id: string; error?: string }) =>
  error ? (
    <span
      id={id}
      className="inline-flex items-center gap-1.5 text-caption-2 font-medium text-danger"
    >
      <Icon name="close" size={14} strokeWidth={2} />
      {error}
    </span>
  ) : null;

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const errors: Record<string, string> = {};
  if (!fullname) errors.fullname = "Full name is required";
  if (!email) errors.email = "Email is required";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string))
    errors.email = "Email is invalid";
  if (!subject) errors.subject = "Subject is required";
  if (!message) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const data = { fullname, email, subject, message };
  return { message: "Message sent successfully", data };
}

const ContactPage = ({ actionData }: Route.ComponentProps) => {
  const errors: Record<string, string> = actionData?.errors ?? {};

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
        {actionData?.message ? (
          <div className="py-6 text-center">
            <h2 className="font-display text-h5 font-semibold text-text">
              Thanks for reaching out.
            </h2>
            <p className="mt-3 text-body text-text-secondary">
              {actionData.message}
            </p>
          </div>
        ) : null}

        <Form className="flex flex-col gap-5" method="post" noValidate>
          <label className={labelClass}>
            Full name
            <input
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Ada Lovelace"
              className={fieldClass(errors.fullname)}
              aria-invalid={errors.fullname ? true : undefined}
              aria-describedby={errors.fullname ? "fullname-error" : undefined}
            />
            <FieldError id="fullname-error" error={errors.fullname} />
          </label>

          <label className={labelClass}>
            Email
            <input
              id="email"
              type="email"
              name="email"
              placeholder="ada@example.com"
              className={fieldClass(errors.email)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <FieldError id="email-error" error={errors.email} />
          </label>

          <label className={labelClass}>
            Subject
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="What's this about?"
              className={fieldClass(errors.subject)}
              aria-invalid={errors.subject ? true : undefined}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            <FieldError id="subject-error" error={errors.subject} />
          </label>

          <label className={labelClass}>
            Message
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me a bit more…"
              className={`${fieldClass(errors.message)} resize-y`}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            <FieldError id="message-error" error={errors.message} />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 font-sans text-button font-semibold text-on-brand transition-[background-color,box-shadow] duration-150 hover:bg-brand-hover hover:shadow-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            <Icon name="mail" size={18} />
            Send message
          </button>
        </Form>
      </section>
    </div>
  );
};

export default ContactPage;
