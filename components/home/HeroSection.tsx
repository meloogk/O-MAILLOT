"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg",
    title: "Nouvelle Collection 2025",
    subtitle: "Découvrez les nouveaux maillots officiels de la saison",
    cta: "Acheter maintenant",
    link: "/products?collection=2025"
  },
  {
    image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg",
    title: "Promotions Spéciales",
    subtitle: "Jusqu'à -40% sur une sélection de maillots",
    cta: "Voir les offres",
    link: "/products?discount=true"
  },
  {
    image: "https://images.pexels.com/photos/47343/the-ball-stadion-football-the-pitch-47343.jpeg",
    title: "Équipes Nationales",
    subtitle: "Supportez votre pays avec nos maillots officiels",
    cta: "Découvrir",
    link: "/products?category=national"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] sm:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl mb-6 max-w-xl mx-auto">
                {slide.subtitle}
              </p>
              <Link href={slide.link}>
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  {slide.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-30 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
        onClick={prevSlide}
        aria-label="Diapositive précédente"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-30 transform -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
        onClick={nextSlide}
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}