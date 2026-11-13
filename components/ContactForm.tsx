"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { sendContact, sendEnquiry } from "@/lib/services";

interface ContactFormProps {
  vehicleId?: string;
  vehicleName?: string;
  initialMessage?: string;
}

type Values = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

export function ContactForm({ vehicleId, vehicleName, initialMessage = "" }: ContactFormProps) {
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", message: initialMessage });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "loading" | "sent" | "not-configured" | "failed">("idle");
  const [notice, setNotice] = useState("");

  function update(field: keyof Values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (state !== "idle") setState("idle");
  }

  function validate() {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (values.phone.trim().replace(/\D/g, "").length < 7) next.phone = "Enter a valid phone number.";
    if (values.message.trim().length < 10) next.message = "Please add a little more detail (at least 10 characters).";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setState("loading");
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      message: values.message.trim(),
      ...(vehicleId ? { vehicleId } : {}),
    };
    const result = vehicleId ? await sendEnquiry(payload) : await sendContact(payload);
    if (result.status === "sent") {
      setState("sent");
      setNotice("Your message has been sent. The team will be in touch.");
      setValues({ name: "", email: "", phone: "", message: "" });
    } else if (result.status === "not-configured") {
      setState("not-configured");
      setNotice("Your details are valid, but message delivery is not connected yet. Please contact the dealership directly once their contact details are added.");
    } else {
      setState("failed");
      setNotice(`We could not send your message. ${result.message} Please try again later.`);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Full name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} required />
          {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} required />
          {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="phone">Phone number <span aria-hidden="true">*</span></label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} required />
        {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
      </div>
      <div className="form-field">
        <label htmlFor="message">{vehicleName ? "How can we help?" : "Message"} <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" rows={5} value={values.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} required placeholder={vehicleName ? `I’d like to know more about the ${vehicleName}…` : "Tell us what you’re looking for…"} />
        {errors.message && <span className="field-error" id="message-error">{errors.message}</span>}
      </div>
      <button className="button button--dark form-submit" type="submit" disabled={state === "loading"}>
        {state === "loading" ? <><LoaderCircle className="spin" size={16} /> Sending…</> : <>Send enquiry <ArrowUpRight size={16} /></>}
      </button>
      <p className={`form-notice form-notice--${state}`} role="status" aria-live="polite">
        {notice || "* Required fields. This form is a preview; messages are not delivered until the API is connected."}
      </p>
    </form>
  );
}
