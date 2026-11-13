import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <section className="not-found shell"><p className="eyebrow"><span className="eyebrow-line" /> Not found</p><h1>This page is<br /><em>not available.</em></h1><p>The vehicle or page you’re looking for may have moved.</p><Link className="button button--dark" href="/cars"><ArrowLeft size={16} /> Back to available cars</Link></section>;
}
