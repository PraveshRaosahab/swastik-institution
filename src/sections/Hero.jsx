import { motion } from "framer-motion";
import { BookOpen, GraduationCap, PenLine, Sigma, Lightbulb, Atom } from "lucide-react";
import { CallButton, WhatsAppButton } from "../components/ContactButtons";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const ORBIT_ICONS = [
  { Icon: BookOpen, angle: 0, radius: 150, size: 26 },
  { Icon: Sigma, angle: 60, radius: 150, size: 24 },
  { Icon: GraduationCap, angle: 120, radius: 150, size: 28 },
  { Icon: PenLine, angle: 180, radius: 150, size: 22 },
  { Icon: Lightbulb, angle: 240, radius: 150, size: 24 },
  { Icon: Atom, angle: 300, radius: 150, size: 26 },
];

function OrbitScene() {
  return (
    <div className="scene relative mx-auto h-[380px] w-[380px] sm:h-[440px] sm:w-[440px]">
      {/* ambient particles */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-400/40 animate-pulse-glow"
            style={{
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* glowing core */}
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-royal-500 via-indigo-500 to-violet-500 opacity-30 blur-3xl animate-pulse-glow" />

      <div className="orbit-stage animate-drift absolute left-1/2 top-1/2 h-0 w-0">
        {ORBIT_ICONS.map(({ Icon, angle, radius, size }, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius * 0.55;
          const z = Math.sin(rad) * 60;
          return (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <div className="flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl glass shadow-xl shadow-navy-950/30 text-cyan-300">
                <Icon size={size} strokeWidth={1.8} />
              </div>
            </div>
          );
        })}
      </div>

      {/* central glass sphere */}
      <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass shadow-2xl shadow-royal-500/20">
        <GraduationCap size={44} className="text-white/90" strokeWidth={1.6} />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* background glow accents */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-royal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300"
          >
            Subhash Nagar, Ludhiana
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Building Strong Foundations.{" "}
            <span className="text-gradient">Creating Brighter Futures.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            Quality education for Classes 1–12 and Spoken English, designed to
            help students learn with confidence and grow with purpose.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#courses"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-royal-500 to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-royal-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Courses
            </a>
            <CallButton size="lg" variant="outline" />
          </motion.div>

          <motion.div variants={item} className="mt-4">
            <WhatsAppButton size="md" />
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            {[
              { title: "Classes 1–10", sub: "All Subjects" },
              { title: "Classes 11–12", sub: "Non-Medical" },
              { title: "Spoken English", sub: "Build Confidence" },
            ].map((card) => (
              <div
                key={card.title}
                className="glass rounded-xl px-4 py-3 text-left shadow-md shadow-navy-950/20"
              >
                <p className="text-sm font-bold text-white">{card.title}</p>
                <p className="text-xs text-cyan-300/90">{card.sub}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <OrbitScene />
        </motion.div>
      </div>
    </section>
  );
}
