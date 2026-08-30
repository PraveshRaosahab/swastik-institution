import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import { CallButton, WhatsAppButton } from "../components/ContactButtons";
import { PHONE_DISPLAY, PHONE_TEL, ADDRESS, ADDRESS_MAPS_LINK } from "../data/contact";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-mist-100 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-royal-500">
            Contact
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-sm text-ink-500 sm:text-base">
            Reach out directly by phone or WhatsApp — we'd love to help you
            find the right course.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="gradient-border mt-14 grid grid-cols-1 gap-8 rounded-3xl bg-white p-8 shadow-lg shadow-ink-900/5 sm:p-10 md:grid-cols-2"
        >
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal-500/10 text-royal-600">
                <Phone size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Phone
                </p>
                <a
                  href={PHONE_TEL}
                  className="mt-1 block font-display text-xl font-bold text-ink-900 hover:text-royal-600"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Address
                </p>
                <a
                  href={ADDRESS_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-base font-semibold text-ink-900 hover:text-royal-600 sm:text-lg"
                >
                  {ADDRESS}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-600">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Class Hours
                </p>
                <p className="mt-1 text-base font-semibold text-ink-900">
                  {/* Contact us for current batch timings */}
                  5:00 PM - 7:00 PM
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-mist-50 p-8 text-center">
            <p className="text-sm text-ink-500">
              Have a question about admissions or courses? Reach us instantly.
            </p>
            <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto">
              <CallButton size="lg" className="w-full sm:w-auto" />
              <WhatsAppButton size="lg" className="w-full sm:w-auto" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
