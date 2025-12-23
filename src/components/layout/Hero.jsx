import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // 1. Import Link

export default function Hero() {
  return (
    <div className="relative h-[600px] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-orange-600 mb-4">
          NEW COLLECTION 2026
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover the latest trends in fashion. Elevate your style with our exclusive new arrivals.
        </p>
        
        {/* 2. Wrap Button in Link */}
        <Link to="/shop">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 cursor-pointer">
            Shop Now
          </Button>
        </Link>

      </div>
    </div>
  );
}