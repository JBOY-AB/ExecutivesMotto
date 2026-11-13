import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { formatMileage, formatPrice } from "@/lib/format";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="vehicle-card">
      <Link className="vehicle-card__image-link" href={`/cars/${vehicle.slug}`} aria-label={`View ${vehicle.year} ${vehicle.brand} ${vehicle.model}`}>
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model} sample vehicle photograph`}
          width={960}
          height={680}
          className="vehicle-card__image"
          sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw"
        />
        <span className="vehicle-card__year">{vehicle.year}</span>
      </Link>
      <div className="vehicle-card__body">
        <div className="vehicle-card__heading-row">
          <p className="eyebrow">{vehicle.brand}</p>
          <p className="vehicle-card__price">{formatPrice(vehicle.price)}</p>
        </div>
        <h3><Link href={`/cars/${vehicle.slug}`}>{vehicle.model}</Link></h3>
        <div className="vehicle-card__meta">
          <span>{formatMileage(vehicle.mileage)}</span><span>{vehicle.fuelType}</span><span>{vehicle.transmission}</span>
        </div>
        <div className="vehicle-card__bottom">
          <span className="condition-chip">{vehicle.condition}</span>
          <Link className="text-link" href={`/cars/${vehicle.slug}`}>View details <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </article>
  );
}
