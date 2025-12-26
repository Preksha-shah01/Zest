import { useState } from "react";
import { Link } from "react-router-dom"; // Ensure only ONE import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">Zest.</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Redefining modern fashion with sustainable choices.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-orange-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop?gender=Men" className="hover:text-white transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop?gender=Women" className="hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Support - UPDATED LINKS */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay in the Loop</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="pl-10 bg-gray-900 border-gray-800 text-white focus:border-orange-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="bg-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Zest Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}