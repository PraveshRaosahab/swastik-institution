import { motion } from "framer-motion";
import { BookOpen, Sigma, MessagesSquare } from "lucide-react";

const stats = [
  { label: "1–10", sub: "All Subjects", Icon: BookOpen },
  { label: "11–12", sub: "Non-Medical", Icon: Sigma },
  { label: "English", sub: "Spoken English", Icon: MessagesSquare },
];

export default function About() {
  return (
    <section id="about" className="relative bg-mist-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-royal-500">
            About Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            A Place Where Learning Builds Confidence
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">
            Swastik Institution focuses on building strong academic
            foundations through conceptual understanding rather than rote
            learning. Every lesson is designed to help students think
            clearly, ask questions, and grow more confident with each step of
            their learning journey — from early classes right through senior
            secondary and spoken English.
          </p>

          <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map(({ label, sub, Icon }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4 }}
                className="gradient-border rounded-2xl bg-white p-4 text-center shadow-sm shadow-ink-900/5 sm:p-5"
              >
                <Icon className="mx-auto text-royal-500" size={22} />
                <p className="mt-2 font-display text-lg font-extrabold text-ink-900 sm:text-xl">
                  {label}
                </p>
                <p className="text-xs text-ink-400 sm:text-sm">{sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="scene relative"
        >
          <div className="relative mx-auto h-72 w-full max-w-md rounded-[2rem] bg-gradient-to-br from-navy-900 via-royal-500/40 to-violet-500/40 p-1 shadow-2xl shadow-royal-500/20 sm:h-80">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-[1.9rem] bg-navy-950/90">
              <div
                className="animate-drift flex h-32 w-32 items-center justify-center rounded-3xl glass"
                style={{ transformStyle: "preserve-3d" }}
              >
                <BookOpen size={48} className="text-cyan-300" strokeWidth={1.5} />
              </div>
              <p className="text-center text-sm font-medium text-white/60 px-8">
                Conceptual clarity, consistent practice, and confident
                communication — the pillars of every classroom here.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
