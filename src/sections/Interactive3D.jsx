import { motion } from "framer-motion";
import { BookOpen, Sigma, GraduationCap, PenLine, Lightbulb, Atom } from "lucide-react";

const FLOATERS = [
  { Icon: BookOpen, top: "12%", left: "10%", size: 30, delay: 0 },
  { Icon: Sigma, top: "24%", left: "78%", size: 26, delay: 0.6 },
  { Icon: GraduationCap, top: "62%", left: "6%", size: 34, delay: 1.1 },
  { Icon: PenLine, top: "70%", left: "82%", size: 24, delay: 0.3 },
  { Icon: Lightbulb, top: "45%", left: "48%", size: 28, delay: 0.9 },
  { Icon: Atom, top: "18%", left: "45%", size: 26, delay: 1.4 },
];

export default function Interactive3D() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-indigo-500/20 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-400/50 animate-pulse-glow"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              top: `${(i * 29) % 100}%`,
              left: `${(i * 41) % 100}%`,
              animationDelay: `${(i % 6) * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="scene pointer-events-none absolute inset-0 hidden sm:block">
        {FLOATERS.map(({ Icon, top, left, size, delay }, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{ top, left, animationDelay: `${delay}s`, "--r": `${i % 2 === 0 ? 6 : -6}deg` }}
          >
            <div className="animate-spin-slow flex h-16 w-16 items-center justify-center rounded-2xl glass text-cyan-300 shadow-xl shadow-navy-950/40">
              <Icon size={size} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs font-semibold uppercase tracking-wider text-cyan-300"
        >
          Beyond The Textbook
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
        >
          Learning That Goes Beyond the Classroom
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 font-display text-xl font-semibold tracking-wide text-gradient sm:text-2xl"
        >
          Learn. Understand. Practice. Grow.
        </motion.p>
      </div>
    </section>
  );
}
