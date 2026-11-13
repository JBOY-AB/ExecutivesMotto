import Link from "next/link";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand-mark${light ? " brand-mark--light" : ""}`} aria-label="Executives Motos home">
      <span className="brand-mark__name">EXECUTIVES</span>
      <span className="brand-mark__sub">MOTOS</span>
    </Link>
  );
}
