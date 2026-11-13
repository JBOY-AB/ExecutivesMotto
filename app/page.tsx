import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Compass, MessageCircle, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { VehicleCard } from "@/components/VehicleCard";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { HeroCarousel } from "@/components/HeroCarousel";
import { getFeaturedVehicles } from "@/lib/vehicle-service";

const trustPoints = [
  { number: "01", title: "Clear details", text: "Straightforward vehicle information, in one place." },
  { number: "02", title: "Thoughtful choice", text: "Browse a considered range of premium cars." },
  { number: "03", title: "Personal assistance", text: "Ask questions and get help choosing what suits you." },
];

export default async function HomePage() {
  const featuredVehicles = await getFeaturedVehicles();
  return (
    <>
      <section className="home-hero">
        <HeroCarousel />
        <div className="home-hero__overlay" />
        <Reveal animateOnMount className="shell home-hero__content">
          <p className="eyebrow eyebrow--light"><span className="eyebrow-line" /> Premium cars, considered</p>
          <h1>A better way<br />to find your <em>next car.</em></h1>
          <p className="home-hero__lede">Explore a considered selection of premium vehicles, with the details you need to choose with confidence.</p>
          <div className="hero-actions">
            <Link className="button button--light" href="/cars">Explore available cars <ArrowUpRight size={17} /></Link>
            <Link className="hero-text-link" href="/contact">Contact us <ArrowRight size={15} /></Link>
          </div>
          <div className="home-hero__foot">
            <span>EXECUTIVES MOTOS <span className="separator-dot">/</span> SAMPLE COLLECTION</span>
            <a href="#featured">Scroll to explore <ArrowDown size={14} /></a>
          </div>
        </Reveal>
        <div className="hero-side-note" aria-hidden="true">QUALITY&nbsp; · &nbsp;CLARITY&nbsp; · &nbsp;SERVICE</div>
      </section>

      <section className="intro-strip">
        <Reveal className="shell intro-strip__inner">
          <p className="eyebrow">An easier search</p>
          <p className="intro-strip__statement">The right vehicle is more than a model. It’s the way it fits your life.</p>
          <Link className="text-link" href="/about">Our approach <ArrowUpRight size={15} /></Link>
        </Reveal>
      </section>

      <section className="section section--light trust-section">
        <div className="shell trust-grid">
          {trustPoints.map((point) => (
            <Reveal key={point.number}>
              <div className="trust-item">
                <span className="trust-item__number">{point.number}</span>
                <h2>{point.title}</h2>
                <p>{point.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--white" id="featured">
        <div className="shell">
          <Reveal className="section-heading section-heading--split">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> The collection</p>
              <h2>Featured <em>vehicles</em></h2>
              <p className="section-lede">A first look at the sample selection. Browse the full catalog to find a vehicle that feels right.</p>
            </div>
            <Link className="text-link section-heading__link" href="/cars">View all cars <ArrowUpRight size={16} /></Link>
          </Reveal>
          <div className="vehicle-grid vehicle-grid--featured">
            {featuredVehicles.slice(0, 3).map((vehicle, index) => (
              <Reveal key={vehicle.id} delay={index * 0.08}><VehicleCard vehicle={vehicle} /></Reveal>
            ))}
          </div>
          <p className="inline-disclaimer">Sample inventory and photography are illustrative only. Confirm current stock, specifications and price before purchase.</p>
        </div>
      </section>

      <section className="process-section">
        <Reveal className="shell process-layout">
          <div className="process-intro">
            <p className="eyebrow eyebrow--light"><span className="eyebrow-line" /> A clear process</p>
            <h2>Good decisions<br />start with <em>clarity.</em></h2>
            <p>From the first browse to the final details, we keep the experience focused on finding the right car for you.</p>
            <Link className="button button--outline-light" href="/contact">Talk to our team <ArrowUpRight size={16} /></Link>
          </div>
          <div className="process-steps">
            {[
              ["01", "Discover and choose", "Explore the available cars and compare the details that matter to you."],
              ["02", "Enquire and get assistance", "Ask about a vehicle, request more information or arrange a conversation."],
              ["03", "Purchase and take delivery", "Confirm the details with the team and agree the next steps for your purchase."],
            ].map(([number, title, text]) => (
              <div className="process-step" key={number}>
                <span className="process-step__number">{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                <ArrowUpRight className="process-step__arrow" size={18} aria-hidden="true" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section section--cream testimonials-section">
        <div className="shell">
          <Reveal className="section-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> A note for launch</p>
            <h2>Stories from <em>our customers</em></h2>
            <p className="section-lede">The examples below are placeholders, not real or verified reviews. Replace them with approved customer feedback before launch.</p>
          </Reveal>
          <div className="testimonial-grid">
            {[
              ["“The process felt clear from the first conversation. I knew exactly what to ask and what to expect.”", "Sample customer 01"],
              ["“The team took the time to understand what I was looking for and kept the conversation straightforward.”", "Sample customer 02"],
              ["“Every detail I needed was easy to find, and getting in touch was simple.”", "Sample customer 03"],
            ].map(([quote, name], index) => (
              <Reveal key={name} delay={index * 0.06}>
                <figure className="testimonial-card">
                  <span className="testimonial-card__mark" aria-hidden="true">“</span>
                  <blockquote>{quote}</blockquote>
                  <figcaption><span className="testimonial-avatar">0{index + 1}</span>{name}</figcaption>
                  <span className="testimonial-sample-label">Sample text</span>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-band">
        <Reveal className="shell contact-band__inner">
          <div>
            <p className="eyebrow eyebrow--light"><span className="eyebrow-line" /> Your next step</p>
            <h2>Let’s find the<br /><em>right car.</em></h2>
            <p>Have a vehicle in mind? Get in touch with a question or tell us what you’re looking for.</p>
          </div>
          <div className="contact-band__actions">
            <Link className="button button--light" href="/contact">Make an enquiry <ArrowUpRight size={17} /></Link>
            <WhatsAppLink className="button button--outline-light" />
            <span className="contact-band__small"><MessageCircle size={14} /> WhatsApp contact is a placeholder until the number is provided.</span>
          </div>
          <div className="contact-band__watermark" aria-hidden="true">EM</div>
        </Reveal>
      </section>
    </>
  );
}
