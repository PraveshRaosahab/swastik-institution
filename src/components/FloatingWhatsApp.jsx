import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../data/contact";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Swastik Institution on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/25"
    >
      <MessageCircle size={26} />
    </motion.a>
  );
}
