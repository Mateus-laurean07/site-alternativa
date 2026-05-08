"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface AutoImageCarouselProps {
  images: string[];
  alt: string;
  interval?: number;
  sizes?: string;
}

export default function AutoImageCarousel({ 
  images, 
  alt, 
  interval = 2500,
  sizes = "(max-width: 768px) 100vw, 33vw"
}: AutoImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((img, idx) => (
        <Image
          key={idx}
          src={img}
          alt={`${alt} ${idx + 1}`}
          fill
          sizes={sizes}
          style={{ 
            objectFit: "contain", 
            padding: "16px",
            opacity: idx === currentIndex ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
      ))}
    </>
  );
}
