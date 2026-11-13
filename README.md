# Executives Motos

A responsive Next.js App Router frontend for a premium vehicle dealership. The catalog, specifications, contact details, and customer feedback in this handoff are **demonstration placeholders** and must be replaced or confirmed before launch. Placeholder photographs are illustrative and may not show the exact vehicle listed.

## Requirements

- Node.js 20.9 or newer
- npm

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To create and run a production build:

```bash
npm run lint
npm run build
npm run start
```

## Replace placeholders before publishing

- **Official logo:** add the provided asset under `public/images/brand/` (suggested filename: `executives-motos-logo.svg`) and update `components/BrandMark.tsx`. Until then, the header and footer use the temporary text-only wordmark requested in the brief.
- **Vehicle details and stock:** edit `lib/vehicles.ts`. This is the centralized sample inventory used by homepage cards, search/filter results, detail pages, and related listings. Only vehicles with `status: "available"` appear in public listings.
- **Vehicle photos:** replace the files referenced by each vehicle's `images` array in `public/images/vehicles/`. The image paths live alongside the vehicle data in `lib/vehicles.ts`. Replace `public/images/hero.jpg` for the homepage hero. Current photos are local Unsplash samples; do not treat them as photos of the listed cars.
- **Contact details:** edit the `company` object in `lib/config.ts`. Phone, email, address, and hours are intentionally not invented.
- **WhatsApp:** put the business number in international digits-only format in `.env.local` as `NEXT_PUBLIC_WHATSAPP_NUMBER=234...`. Until configured, WhatsApp actions route visitors to the contact form and state that the number is pending.
- **Customer testimonials:** replace the clearly marked sample quotes in `app/page.tsx` with approved real reviews, or remove that section.
- **Production domain:** update `metadataBase` in `app/layout.tsx` and the base URL in `app/robots.ts` and `app/sitemap.ts`.

## Forms and NestJS API integration

Forms validate name, email, phone, and message in the browser. They do **not** claim to send anything while the API is unconfigured. To connect the expected NestJS API, set the base URL in `.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

The frontend adapter is in `lib/services.ts` for `POST /contact` and `POST /enquiries`. Vehicle reads are abstracted in `lib/vehicle-service.ts`; it uses `lib/vehicles.ts` when no API URL is set and expects these GET endpoints when configured:

- `GET /vehicles` — available vehicles
- `GET /vehicles/:slug` — a single available vehicle
- `GET /vehicles/featured` — featured vehicles
- `GET /vehicles/brands` — brand names

The pages expect either a direct JSON array/object or a `{ "data": ... }` response envelope. Contact/enquiry payloads are typed in `lib/services.ts`. API secrets must stay on the server; do not add secrets to `NEXT_PUBLIC_*` variables. This repository does not include a NestJS application or MySQL setup—the backend is a documented integration point, not a fabricated service.

When the API becomes available, run it separately from this frontend using its own project instructions. No rental, vehicle hire, or trade-in flow is included.

## Main structure

- `app/` — homepage, inventory, dynamic vehicle detail, about, and contact pages; metadata, sitemap, and robots routes
- `components/` — shared navigation, footer, forms, gallery, inventory filters, cards, and contact links
- `lib/vehicles.ts` — centralized demonstration vehicle data
- `lib/vehicle-service.ts` — mock/API read adapter
- `lib/services.ts` — contact and vehicle-enquiry submission adapter
- `lib/config.ts` — business contact and WhatsApp configuration
- `public/images/` — replaceable local placeholder photography

## Notes

- Prices are displayed in Nigerian Naira (NGN).
- Inventory search, filters, sorting, vehicle routes, gallery thumbnails, lightbox, mobile navigation, and form validation run on the frontend.
- The sample reviews are explicitly marked and must not be represented as real or verified.
- No official logo, address, phone number, email address, social account, service history, award, or dealership statistic has been invented.
