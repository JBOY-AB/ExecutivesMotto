import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { company } from "@/lib/config";

export function WhatsAppLink({ vehicleName, className = "button button--outline-light" }: { vehicleName?: string; className?: string }) {
  const message = vehicleName
    ? `Hello, I would like to enquire about the ${vehicleName}. Please share more details.`
    : "Hello, I would like to enquire about your available cars.";
  const number = company.whatsappNumber.replace(/\D/g, "");
  const href = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : vehicleName
      ? `/contact?vehicle=${encodeURIComponent(vehicleName)}`
      : "/contact";
  return (
    <Link href={href} className={className} aria-label={number ? "Enquire on WhatsApp" : "WhatsApp is not configured; go to the contact form"}>
      <MessageCircle size={16} aria-hidden="true" />
      {number ? "WhatsApp us" : "WhatsApp · details pending"}
      <ArrowUpRight size={15} aria-hidden="true" />
    </Link>
  );
}
