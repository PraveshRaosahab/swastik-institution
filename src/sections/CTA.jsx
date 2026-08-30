import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { CallButton, WhatsAppButton } from "../components/ContactButtons";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-royal-500 via-indigo-500 to-violet-500 py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-navy-950/20 blur-3xl" />
      <div className="animate-spin-slow pointer-events-none absolute right-10 top-10 hidden text-white/10 sm:block">
        <GraduationCap size={140} strokeWidth={0.8} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          Ready to Take the Next Step?
        </h2>
        <p className="mt-4 text-base text-white/85 sm:text-lg">
          Start your learning journey with Swastik Institution.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <CallButton size="lg" variant="white" />
          <WhatsAppButton size="lg" />
          <a
            href="#courses"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 hover:-translate-y-0.5"
          >
            Explore Courses
          </a>
        </div>
      </motion.div>
    </section>
  );
}
