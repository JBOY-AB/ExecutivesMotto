import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import { VehicleGallery } from "@/components/VehicleGallery";
import { VehicleCard } from "@/components/VehicleCard";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { formatMileage, formatPrice } from "@/lib/format";
import { getRelatedVehicles, getVehicle, getVehicles } from "@/lib/vehicle-service";

export async function generateStaticParams() {
  return (await getVehicles()).map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  return {
    title: `${vehicle.year} ${vehicle.brand} ${vehicle.model}`,
    description: `Explore the sample listing for the ${vehicle.year} ${vehicle.brand} ${vehicle.model}. Confirm details and availability with Executives Motos.`,
    openGraph: { images: [vehicle.images[0]] },
  };
}

export default async function VehicleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) notFound();
  const name = `${vehicle.year} ${vehicle.brand} ${vehicle.model}`;
  const related = await getRelatedVehicles(vehicle, 3);
  const specs = [
    ["Make", vehicle.brand], ["Model", vehicle.model], ["Year", String(vehicle.year)],
    ["Mileage", formatMileage(vehicle.mileage)], ["Fuel", vehicle.fuelType], ["Transmission", vehicle.transmission],
    ["Engine", vehicle.engineCapacity], ["Power", vehicle.horsepower ? `${vehicle.horsepower} hp` : undefined],
    ["Exterior", vehicle.exteriorColour], ["Interior", vehicle.interiorColour], ["Condition", vehicle.condition],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <div className="page-main">
      <section className="detail-top shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/cars">Available cars</Link><span>/</span><span aria-current="page">{vehicle.model}</span></nav>
        <Link className="back-link" href="/cars"><ArrowLeft size={15} /> Back to the collection</Link>
      </section>
      <section className="shell detail-hero">
        <div className="detail-gallery-col">
          <VehicleGallery images={vehicle.images} name={name} />
          <p className="photo-note">Sample photography shown for illustration. Images may not depict the exact vehicle.</p>
        </div>
        <aside className="detail-summary">
          <div className="detail-status"><span className="status-dot" /> Sample listing · availability to be confirmed</div>
          <p className="eyebrow">{vehicle.brand} <span className="separator-dot">/</span> {vehicle.year}</p>
          <h1>{vehicle.model}</h1>
          <p className="detail-summary__subtitle">{vehicle.condition} <span>·</span> {formatMileage(vehicle.mileage)}</p>
          <p className="detail-price">{formatPrice(vehicle.price)}</p>
          <p className="detail-summary__copy">{vehicle.description}</p>
          <div className="detail-actions">
            <Link className="button button--dark" href="#enquiry">Enquire about this car <ArrowUpRight size={16} /></Link>
            <WhatsAppLink vehicleName={name} className="button button--outline" />
          </div>
          <p className="detail-location"><MapPin size={15} /> {vehicle.location}</p>
        </aside>
      </section>

      <section className="section section--cream detail-specs-section">
        <div className="shell detail-columns">
          <div className="detail-section-heading"><p className="eyebrow"><span className="eyebrow-line" /> Vehicle overview</p><h2>Details that<br /><em>matter.</em></h2><p>Illustrative specifications only. Please confirm all vehicle information before purchase.</p></div>
          <div className="spec-grid">
            {specs.map(([label, value]) => <div className="spec-item" key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="shell detail-columns detail-description">
          <div className="detail-section-heading"><p className="eyebrow"><span className="eyebrow-line" /> At a glance</p><h2>Designed for<br /><em>the drive.</em></h2></div>
          <div className="detail-description__content">
            <p>{vehicle.description}</p>
            <h3>Features and equipment</h3>
            <ul className="feature-list">{vehicle.features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>)}</ul>
            <p className="small-disclaimer">Equipment shown is demonstration content. Confirm the exact specification and condition with the dealership.</p>
          </div>
        </div>
      </section>

      <section className="section section--cream enquiry-section" id="enquiry">
        <div className="shell enquiry-layout">
          <div className="enquiry-intro">
            <p className="eyebrow"><span className="eyebrow-line" /> Personal enquiry</p>
            <h2>Interested in<br /><em>this vehicle?</em></h2>
            <p>Send a message about the {vehicle.brand} {vehicle.model}. The form will not deliver messages until a backend is connected.</p>
            <div className="enquiry-vehicle"><Image src={vehicle.images[0]} alt="" width={160} height={110} /><div><span>{vehicle.year} {vehicle.brand}</span><strong>{vehicle.model}</strong><b>{formatPrice(vehicle.price)}</b></div></div>
          </div>
          <div className="enquiry-form-panel"><ContactForm vehicleId={vehicle.id} vehicleName={name} initialMessage={`I’m interested in the ${name}. Please share more details.`} /></div>
        </div>
      </section>

      <section className="section section--white related-section">
        <div className="shell">
          <div className="section-heading section-heading--split"><div><p className="eyebrow"><span className="eyebrow-line" /> Continue exploring</p><h2>Similar <em>vehicles</em></h2></div><Link className="text-link section-heading__link" href="/cars">All vehicles <ArrowUpRight size={16} /></Link></div>
          <div className="vehicle-grid vehicle-grid--featured">{related.map((item) => <VehicleCard key={item.id} vehicle={item} />)}</div>
        </div>
      </section>
    </div>
  );
}

