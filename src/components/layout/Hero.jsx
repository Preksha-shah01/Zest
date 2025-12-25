import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    title: "NEW COLLECTION 2026",
    subtitle: "Discover the latest trends in fashion. Elevate your style."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    title: "WOMEN'S EXCLUSIVE",
    subtitle: "Elegant styles for the modern woman. Shop the look."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617137968427-b57427100084?q=80&w=2000&auto=format&fit=crop",
    title: "MEN'S STREETWEAR",
    subtitle: "Bold, comfortable, and stylish. Redefine your wardrobe."
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url("${slide.image}")` }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl px-6 animate-in fade-in zoom-in duration-700 key={current}">
        <h1 className="text-4xl md:text-6xl font-bold text-orange-500 mb-4 tracking-tight">
          {slides[current].title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          {slides[current].subtitle}
        </p>
        
        <Link to="/shop">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 h-12 text-lg cursor-pointer transition-transform hover:scale-105">
            Shop Now
          </Button>
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition cursor-pointer"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition cursor-pointer"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-orange-500 w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

    </div>
  );
}