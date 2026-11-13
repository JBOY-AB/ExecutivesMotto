import type { MetadataRoute } from "next";
import { availableVehicles } from "@/lib/vehicles";

const base = "https://executives-motos.example";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/cars", "/about", "/contact"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
  const carPages = availableVehicles.map((vehicle) => ({ url: `${base}/cars/${vehicle.slug}`, lastModified: new Date() }));
  return [...pages, ...carPages];
}
