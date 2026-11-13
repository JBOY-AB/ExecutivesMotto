"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

export function VehicleGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const move = (step: number) => setActive((index) => (index + step + images.length) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox, images.length]);

  return (
    <div className="gallery-wrap">
      <div className="gallery-main">
        <Image src={images[active]} alt={`${name} illustrative photograph ${active + 1} of ${images.length}`} fill priority sizes="(max-width: 760px) 100vw, 65vw" className="gallery-main__image" />
        <button className="gallery-expand" type="button" onClick={() => setLightbox(true)} aria-label="Open full-screen image gallery"><Expand size={18} /></button>
        {images.length > 1 && <>
          <button className="gallery-arrow gallery-arrow--left" type="button" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button>
          <button className="gallery-arrow gallery-arrow--right" type="button" onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button>
        </>}
        <span className="gallery-count">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
      </div>
      <div className="gallery-thumbs" role="group" aria-label="Choose vehicle image">
        {images.map((image, index) => (
          <button key={image} className={`gallery-thumb${index === active ? " is-active" : ""}`} type="button" onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`} aria-pressed={index === active}>
            <Image src={image} alt="" fill sizes="140px" />
          </button>
        ))}
      </div>
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} image gallery`}>
        <button className="lightbox-close" type="button" onClick={() => setLightbox(false)} aria-label="Close image gallery"><X size={24} /></button>
        <button className="lightbox-arrow lightbox-arrow--left" type="button" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft size={30} /></button>
        <div className="lightbox-image"><Image src={images[active]} alt={`${name} illustrative photograph ${active + 1}`} fill sizes="100vw" priority /></div>
        <button className="lightbox-arrow lightbox-arrow--right" type="button" onClick={() => move(1)} aria-label="Next image"><ChevronRight size={30} /></button>
        <span className="lightbox-count">{active + 1} / {images.length}</span>
      </div>}
    </div>
  );
}
