import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Executives Motos with a question about a vehicle or the sample collection.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ vehicle?: string; channel?: string }> }) {
  const query = await searchParams;
  const vehicleName = query.vehicle?.trim();
  const channelMessage = query.channel === "whatsapp" ? "WhatsApp is not configured yet. Please leave a message and the dealership can add its number before launch." : "";
  const initialMessage = vehicleName ? `I’m interested in the ${vehicleName}. Please share more details.` : "";

  return (
    <div className="page-main">
      <section className="page-intro page-intro--contact">
        <div className="shell">
          <p className="eyebrow"><span className="eyebrow-line" /> Contact</p>
          <h1>Let’s talk <em>cars.</em></h1>
          <p className="page-intro__lede">Tell us what you’re looking for or ask a question about a vehicle in the collection.</p>
        </div>
      </section>
      <section className="section section--white contact-main">
        <div className="shell contact-layout">
          <aside className="contact-sidebar">
            <div className="contact-sidebar__top"><p className="eyebrow"><span className="eyebrow-line" /> Get in touch</p><h2>We’re here<br />to <em>help.</em></h2><p>Choose the easiest way to reach the team. Contact information will be updated when provided by the business.</p></div>
            <div className="contact-info-list">
              <div className="contact-info-item"><span><Phone size={17} /></span><div><small>Phone</small><strong>{company.phone}</strong></div></div>
              <div className="contact-info-item"><span><Mail size={17} /></span><div><small>Email</small><strong>{company.email}</strong></div></div>
              <div className="contact-info-item"><span><MapPin size={17} /></span><div><small>Address</small><strong>{company.address}</strong></div></div>
              <div className="contact-info-item"><span><Clock3 size={17} /></span><div><small>Opening hours</small><strong>{company.openingHours}</strong></div></div>
            </div>
            {channelMessage && <p className="channel-notice" role="status">{channelMessage}</p>}
            {vehicleName && <p className="channel-notice" role="status">Your enquiry is pre-filled for: <strong>{vehicleName}</strong></p>}
            <p className="contact-sidebar__note">This preview uses placeholder contact details. Replace them before publishing.</p>
          </aside>
          <div className="contact-form-wrap" id="contact-form">
            <div className="contact-form-wrap__heading"><p className="eyebrow">Send an enquiry</p><h2>How can we <em>help?</em></h2></div>
            <ContactForm initialMessage={initialMessage} />
            <p className="contact-form-api-note">Form delivery is currently disabled. Connect the NestJS API to receive submissions.</p>
          </div>
        </div>
      </section>
      <section className="contact-map-placeholder" aria-label="Business location details pending">
        <div className="shell contact-map-placeholder__inner"><span className="map-pin"><MapPin size={20} /></span><div><p className="eyebrow">Visit us</p><h2>Business address to be provided.</h2><p>No location map is shown until a confirmed business address is supplied.</p></div><Link className="text-link" href="/cars">Explore the collection <ArrowUpRight size={15} /></Link></div>
      </section>
    </div>
  );
}
