"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { src: "/images/hero.jpg", alt: "A premium black sports sedan on the road at dusk" },
  { src: "/images/vehicles/audi-r8.jpg", alt: "Audi R8" },
  { src: "/images/vehicles/mercedes-amg-gt-red.jpg", alt: "Red Mercedes-AMG GT" },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <>
      <div className="hero-carousel" aria-label="Featured vehicles" aria-live="off">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`home-hero__image${index === activeIndex ? " is-active" : ""}`}
            aria-hidden={index !== activeIndex}
          />
        ))}
      </div>
      <div className="hero-carousel__controls" aria-label="Hero image controls">
        <button type="button" onClick={showPrevious} aria-label="Show previous image">
          <ChevronLeft size={18} />
        </button>
        <span aria-live="polite" className="hero-carousel__count">
          {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button type="button" onClick={showNext} aria-label="Show next image">
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  );
}
