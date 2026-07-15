import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  // Replace this with your actual business phone number
  const whatsappNumber = "919876543210"; 
  const preFilledMessage = encodeURIComponent("Hi! I'm interested in premium real estate options. Please connect me with an agent.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${preFilledMessage}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[998] bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-xl hover:bg-[#20ba5a] hover:-translate-y-1 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out flex items-center justify-center group cursor-pointer"
    >
      {/* Lucide React Icon replacing the raw SVG */}
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" />

      {/* Floating Interactive Label Hint */}
      <span className="absolute right-16 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md opacity-0 hidden md:block md:group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap pointer-events-none">
        Need Help? Chat Now
      </span>
    </a>
  );
}