import { useLocation } from "react-router-dom";

export default function Policy() {
  const location = useLocation();
  
  // Determine content based on URL
  let title = "Policy";
  let content = "Information coming soon.";

  if (location.pathname === "/faq") {
    title = "Frequently Asked Questions";
    content = (
      <div className="space-y-4">
        <div>
          <h3 className="font-bold">How long does shipping take?</h3>
          <p className="text-gray-600">Standard shipping takes 5-7 business days.</p>
        </div>
        <div>
          <h3 className="font-bold">What is the return policy?</h3>
          <p className="text-gray-600">You can return any item within 30 days of purchase.</p>
        </div>
      </div>
    );
  } else if (location.pathname === "/privacy") {
    title = "Privacy Policy";
    content = "We value your privacy. We do not sell your data to third parties. All payments are processed securely.";
  } else if (location.pathname === "/shipping") {
    title = "Shipping & Returns";
    content = "We offer free shipping on orders over ₹2000. Returns are free and easy - just contact support to get a return label.";
  } else if (location.pathname === "/terms") {
    title = "Terms & Conditions";
    content = "By using this website, you agree to our terms of service. All content is copyright 2026 Zest Inc.";
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="text-lg leading-relaxed text-gray-700 bg-gray-50 p-8 rounded-xl border">
        {content}
      </div>
    </div>
  );
}