import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending email
    toast.success("Message sent successfully! We'll get back to you soon.", {
      icon: '📬',
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Have questions about our latest collection or need help with an order? 
          Our team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Contact Information */}
        <div className="space-y-8">
          <Card className="bg-black text-white border-none">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Headquarters</h4>
                  <p className="text-gray-300">123 Fashion Street, Bandra West</p>
                  <p className="text-gray-300">Mumbai, Maharashtra 400050</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p className="text-gray-300">+91 98765 43210</p>
                  <p className="text-gray-400 text-sm">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-gray-300">support@zest.com</p>
                  <p className="text-gray-300">wholesale@zest.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <Input 
                      required 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input 
                      required 
                      type="email" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    required 
                    placeholder="How can we help you?" 
                    className="min-h-[150px]"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white h-12 px-8 text-lg">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}