import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Compass, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn about the approach behind Executives Motos and its premium vehicle selection.",
};

export default function AboutPage() {
  return (
    <div className="page-main">
      <section className="about-hero shell">
        <div className="about-hero__copy">
          <p className="eyebrow"><span className="eyebrow-line" /> About Executives Motos</p>
          <h1>Good cars.<br /><em>Clear choices.</em></h1>
          <p>Buying a vehicle is a meaningful decision. Our aim is to make discovering your next car feel considered, straightforward and personal.</p>
          <Link className="button button--dark" href="/cars">Explore the collection <ArrowUpRight size={16} /></Link>
        </div>
        <div className="about-hero__image">
          <Image src="/images/vehicles/chevrolet-camaro-showroom.jpg" alt="Sample premium cars displayed in a showroom" fill priority sizes="(max-width: 760px) 100vw, 52vw" />
          <span className="image-caption">A considered selection. Sample photography.</span>
        </div>
      </section>
      <section className="section section--dark about-statement">
        <div className="shell about-statement__inner">
          <p className="eyebrow eyebrow--light"><span className="eyebrow-line" /> Our mission</p>
          <h2>Make finding a premium vehicle feel <em>simple.</em></h2>
          <p>We bring the selection, important details and a personal point of contact together, so customers can explore with greater clarity and decide at their own pace.</p>
        </div>
      </section>
      <section className="section section--white about-principles">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line" /> What guides us</p><h2>A better experience,<br /><em>by design.</em></h2></div>
          <div className="principles-grid">
            {[
              [Compass, "Choice with purpose", "A clear selection makes it easier to focus on the models that fit your priorities."],
              [ShieldCheck, "Clarity at every step", "Useful vehicle information and direct answers help make each decision more informed."],
              [Sparkles, "Personal attention", "A thoughtful conversation should leave you confident about what comes next."],
            ].map(([Icon, title, copy]) => {
              const PrincipleIcon = Icon as typeof Compass;
              return <article className="principle-card" key={title as string}><span className="principle-icon"><PrincipleIcon size={21} strokeWidth={1.5} /></span><h3>{title as string}</h3><p>{copy as string}</p></article>;
            })}
          </div>
        </div>
      </section>
      <section className="about-feature shell">
        <div className="about-feature__image"><Image src="/images/vehicles/bmw-4-series.jpg" alt="Illustrative premium vehicle photography" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="about-feature__copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Our commitment</p>
          <h2>Respect for<br /><em>your decision.</em></h2>
          <p>From the first question to the final conversation, our focus is on clear communication and a helpful experience. No pressure—just the information and support you need to make your choice.</p>
          <ul className="feature-list feature-list--compact"><li><Check size={15} />Straightforward vehicle information</li><li><Check size={15} />A personal point of contact</li><li><Check size={15} />Time to decide what works for you</li></ul>
          <Link className="text-link" href="/contact">Speak with our team <ArrowUpRight size={15} /></Link>
        </div>
      </section>
      <section className="contact-band contact-band--compact">
        <div className="shell contact-band__inner"><div><p className="eyebrow eyebrow--light"><span className="eyebrow-line" /> Begin your search</p><h2>Your next car<br />starts <em>here.</em></h2></div><Link className="button button--light" href="/cars">Browse available cars <ArrowUpRight size={16} /></Link><div className="contact-band__watermark" aria-hidden="true">EM</div></div>
      </section>
    </div>
  );
}
