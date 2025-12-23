import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="md:hidden w-6 h-6 text-gray-600 cursor-pointer" />
      </SheetTrigger>
      
      {/* ADDED: p-6 to give space all around */}
      <SheetContent side="left" className="w-[300px] bg-white p-6">
        
        {/* ADDED: A Header to push content down and look nice */}
        <SheetHeader className="mb-8 text-left">
          <SheetTitle className="text-2xl font-bold text-orange-600">Zest.</SheetTitle>
        </SheetHeader>

        {/* Links container */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-lg font-medium hover:text-orange-600 transition">
            Home
          </Link>
          <Link to="/shop" className="text-lg font-medium hover:text-orange-600 transition">
            Shop
          </Link>
          <Link to="/new-arrivals" className="text-lg font-medium hover:text-orange-600 transition">
            New Arrivals
          </Link>
          <Link to="/sale" className="text-lg font-medium text-orange-600 hover:text-orange-700 transition">
            Sale
          </Link>
          
          <div className="h-px bg-gray-200 my-2"></div>
          
          <Link to="/login" className="text-lg font-medium text-gray-500 hover:text-black transition">
            Login / Sign Up
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}