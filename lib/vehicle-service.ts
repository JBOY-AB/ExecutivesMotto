import { apiBaseUrl } from "@/lib/config";
import { availableVehicles, getVehicleBySlug } from "@/lib/vehicles";
import type { Vehicle } from "@/types/vehicle";

type ListResponse = Vehicle[] | { data: Vehicle[] };
type SingleResponse = Vehicle | { data: Vehicle };

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Vehicle API request failed (${response.status}) for ${path}.`);
  return response.json() as Promise<T>;
}

export async function getVehicles(): Promise<Vehicle[]> {
  if (!apiBaseUrl) return availableVehicles;
  const payload = await apiGet<ListResponse>("/vehicles");
  const rows = Array.isArray(payload) ? payload : payload.data;
  return rows.filter((vehicle) => vehicle.status === "available");
}

export async function getVehicle(slug: string): Promise<Vehicle | undefined> {
  if (!apiBaseUrl) return getVehicleBySlug(slug);
  try {
    const payload = await apiGet<SingleResponse>(`/vehicles/${encodeURIComponent(slug)}`);
    const vehicle = "data" in payload ? payload.data : payload;
    return vehicle.status === "available" ? vehicle : undefined;
  } catch (error) {
    if (error instanceof Error && error.message.includes("(404)")) return undefined;
    throw error;
  }
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  if (!apiBaseUrl) return availableVehicles.filter((vehicle) => vehicle.featured);
  const payload = await apiGet<ListResponse>("/vehicles/featured");
  const rows = Array.isArray(payload) ? payload : payload.data;
  return rows.filter((vehicle) => vehicle.status === "available");
}

export async function getVehicleBrands(): Promise<string[]> {
  if (!apiBaseUrl) return [...new Set(availableVehicles.map((vehicle) => vehicle.brand))].sort();
  const payload = await apiGet<string[] | { data: string[] }>("/vehicles/brands");
  return Array.isArray(payload) ? payload : payload.data;
}

export async function getRelatedVehicles(vehicle: Vehicle, limit = 3): Promise<Vehicle[]> {
  return (await getVehicles()).filter((item) => item.slug !== vehicle.slug).slice(0, limit);
}
