import { Phone, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from "../data/contact";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";

const sizes = {
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

export function CallButton({ size = "md", variant = "solid", className = "" }) {
  const variantClass =
    variant === "solid"
      ? "bg-gradient-to-r from-royal-500 to-indigo-500 text-white shadow-lg shadow-royal-500/30 hover:shadow-xl hover:shadow-royal-500/40 hover:-translate-y-0.5 active:translate-y-0"
      : variant === "white"
      ? "bg-white text-royal-600 shadow-lg shadow-navy-950/10 hover:shadow-xl hover:-translate-y-0.5"
      : "border border-white/25 text-white hover:bg-white/10 hover:-translate-y-0.5";

  return (
    <a
      href={PHONE_TEL}
      aria-label={`Call Swastik Institution at ${PHONE_DISPLAY}`}
      className={`${base} ${sizes[size]} ${variantClass} ${className}`}
    >
      <Phone size={18} aria-hidden="true" />
      Call {PHONE_DISPLAY}
    </a>
  );
}

export function WhatsAppButton({ size = "md", variant = "solid", className = "" }) {
  const variantClass =
    variant === "solid"
      ? "bg-[#25D366] text-white shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
      : "border border-[#25D366]/50 text-[#0E1526] bg-white hover:bg-[#25D366]/10 hover:-translate-y-0.5";

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Swastik Institution on WhatsApp"
      className={`${base} ${sizes[size]} ${variantClass} ${className}`}
    >
      <MessageCircle size={18} aria-hidden="true" />
      WhatsApp Us
    </a>
  );
}
