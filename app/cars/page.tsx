import type { Metadata } from "next";
import { InventoryBrowser } from "@/components/InventoryBrowser";
import { getVehicles } from "@/lib/vehicle-service";

export const metadata: Metadata = {
  title: "Available cars",
  description: "Browse and filter the Executives Motos sample vehicle catalog.",
};

export default async function CarsPage() {
  const vehicles = await getVehicles();
  return (
    <div className="page-main">
      <section className="page-intro page-intro--inventory">
        <div className="shell">
          <p className="eyebrow"><span className="eyebrow-line" /> The collection</p>
          <h1>Find your next <em>car.</em></h1>
          <p className="page-intro__lede">Explore the sample catalog, compare the details and enquire about a vehicle.</p>
          <p className="preview-banner">Preview catalog · All listings and photographs are illustrative. Replace with confirmed stock before launch.</p>
        </div>
      </section>
      <section className="section section--white inventory-section">
        <div className="shell"><InventoryBrowser vehicles={vehicles} /></div>
      </section>
    </div>
  );
}
