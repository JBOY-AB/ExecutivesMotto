export const company = {
  name: "Executives Motos",
  tagline: "A considered way to find your next car.",
  phone: "Details to be provided",
  email: "Email address to be provided",
  address: "Business address to be provided",
  openingHours: "Opening hours to be confirmed",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
};

export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
