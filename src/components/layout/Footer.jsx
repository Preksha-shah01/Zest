import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setEmail("");
      // Reset success message after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }, 500);
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMN 1: Brand Info */}
          <div>
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Zest.</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Elevating your style with the latest trends. Quality fashion for the modern individual.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Shop</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/shop" className="hover:text-orange-500 transition">All Products</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-orange-500 transition">New Arrivals</Link>
              </li>
              <li>
                <Link to="/sale" className="hover:text-orange-500 transition">Sale & Offers</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-orange-500 transition">Men's Collection</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-orange-500 transition">Women's Collection</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>123 Fashion Street, <br />Mumbai, India 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <span>support@zestfashion.com</span>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            
            {subscribed ? (
              <div className="bg-green-600/20 text-green-400 p-3 rounded-lg text-center border border-green-600/50">
                🎉 Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold cursor-pointer">
                  Subscribe
                </Button>
              </form>
            )}
          </div>

        </div>

        <Separator className="bg-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 Zest Fashion. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">FAQ</a>
          </div>
        </div>

      </div>
    </footer>
  );
}