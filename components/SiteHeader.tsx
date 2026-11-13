"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { href: "/cars", label: "Available cars" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner shell">
        <BrandMark />
        <nav id="main-navigation" className={`main-nav${open ? " main-nav--open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${pathname === link.href || (link.href === "/cars" && pathname.startsWith("/cars")) ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link className="nav-cta nav-cta--mobile" href="/contact" onClick={() => setOpen(false)}>
            Start an enquiry <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </nav>
        <Link className="nav-cta nav-cta--desktop" href="/contact">
          Start an enquiry <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}
