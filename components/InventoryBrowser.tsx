"use client";

import { useMemo, useState } from "react";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";
import { VehicleCard } from "@/components/VehicleCard";
import type { FuelType, Transmission, Vehicle, VehicleCondition } from "@/types/vehicle";

export function InventoryBrowser({ vehicles }: { vehicles: Vehicle[] }) {
  const brands = [...new Set(vehicles.map((item) => item.brand))].sort();
  const fuels = [...new Set(vehicles.map((item) => item.fuelType))] as FuelType[];
  const transmissions = [...new Set(vehicles.map((item) => item.transmission))] as Transmission[];
  const conditions = [...new Set(vehicles.map((item) => item.condition))] as VehicleCondition[];
  const years = [...new Set(vehicles.map((item) => item.year))].sort((a, b) => b - a);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [condition, setCondition] = useState("");
  const [year, setYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    return vehicles.filter((vehicle) => {
      const matchesSearch = !query || `${vehicle.brand} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(query);
      return matchesSearch && (!brand || vehicle.brand === brand) && (!fuel || vehicle.fuelType === fuel) &&
        (!transmission || vehicle.transmission === transmission) && (!condition || vehicle.condition === condition) &&
        (!year || vehicle.year === Number(year)) && (!minPrice || vehicle.price >= Number(minPrice)) &&
        (!maxPrice || vehicle.price <= Number(maxPrice));
    }).sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "oldest") return a.year - b.year;
      if (sort === "mileage") return a.mileage - b.mileage;
      return b.year - a.year;
    });
  }, [vehicles, search, brand, fuel, transmission, condition, year, minPrice, maxPrice, sort]);

  function reset() {
    setSearch(""); setBrand(""); setFuel(""); setTransmission(""); setCondition("");
    setYear(""); setMinPrice(""); setMaxPrice(""); setSort("newest");
  }

  return (
    <div className="inventory-browser">
      <div className="inventory-controls">
        <div className="inventory-search">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="vehicle-search">Search by make, model or year</label>
          <input id="vehicle-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search make, model or year" />
        </div>
        <div className="inventory-sort">
          <label htmlFor="sort-by">Sort by</label>
          <select id="sort-by" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="mileage">Lowest mileage</option>
          </select>
        </div>
      </div>
      <details className="filter-details">
        <summary><SlidersHorizontal size={16} /> Refine your search <span>Filter by vehicle details</span></summary>
        <div className="filter-grid">
          <div className="filter-field"><label htmlFor="filter-brand">Make</label><select id="filter-brand" value={brand} onChange={(e) => setBrand(e.target.value)}><option value="">All makes</option>{brands.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="filter-field"><label htmlFor="filter-year">Year</label><select id="filter-year" value={year} onChange={(e) => setYear(e.target.value)}><option value="">Any year</option>{years.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
          <div className="filter-field"><label htmlFor="filter-fuel">Fuel type</label><select id="filter-fuel" value={fuel} onChange={(e) => setFuel(e.target.value)}><option value="">All fuel types</option>{fuels.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="filter-field"><label htmlFor="filter-transmission">Transmission</label><select id="filter-transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)}><option value="">All transmissions</option>{transmissions.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="filter-field"><label htmlFor="filter-condition">Condition</label><select id="filter-condition" value={condition} onChange={(e) => setCondition(e.target.value)}><option value="">All conditions</option>{conditions.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="filter-field"><label htmlFor="filter-min">Min price (₦)</label><input id="filter-min" type="number" min="0" step="1000000" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="No minimum" /></div>
          <div className="filter-field"><label htmlFor="filter-max">Max price (₦)</label><input id="filter-max" type="number" min="0" step="1000000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="No maximum" /></div>
          <div className="filter-reset"><button type="button" className="text-link" onClick={reset}><RotateCcw size={15} /> Clear all filters</button></div>
        </div>
      </details>
      <div className="inventory-results-row">
        <p><strong>{results.length}</strong> {results.length === 1 ? "vehicle" : "vehicles"} <span>· Sample inventory</span></p>
        <span className="sample-note">Listings and photos are illustrative only.</span>
      </div>
      {results.length ? <div className="vehicle-grid">
        {results.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
      </div> : <div className="empty-state"><div className="empty-state__icon"><Search size={21} /></div><h2>No vehicles match those filters.</h2><p>Try changing your search or clearing one or more filters.</p><button type="button" className="button button--dark" onClick={reset}><RotateCcw size={15} /> Reset filters</button></div>}
    </div>
  );
}
