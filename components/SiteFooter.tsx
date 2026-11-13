import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { company } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand-col">
          <BrandMark light />
          <p className="footer-tagline">A considered way to find your next car.</p>
        </div>
        <div className="footer-col">
          <h2>Explore</h2>
          <Link href="/cars">Available cars</Link>
          <Link href="/about">About us</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h2>Get in touch</h2>
          <span>{company.phone}</span>
          <span>{company.email}</span>
          <span>{company.address}</span>
          <Link className="footer-contact-link" href="/contact">Contact the team <ArrowUpRight size={14} /></Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        <p className="footer-note">Sample listings and photography are illustrative.</p>
      </div>
    </footer>
  );
}
