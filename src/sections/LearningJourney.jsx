import { motion } from "framer-motion";

const STEPS = [
  { n: "01", title: "Build Foundations", text: "Start with clear basics in every subject." },
  { n: "02", title: "Understand Concepts", text: "Move beyond memorizing to real understanding." },
  { n: "03", title: "Practice Regularly", text: "Reinforce learning through consistent practice." },
  { n: "04", title: "Build Confidence", text: "Gain confidence to speak up and take on challenges." },
  { n: "05", title: "Achieve Your Goals", text: "Apply what you've learned to reach your academic goals." },
];

export default function LearningJourney() {
  return (
    <section className="relative bg-mist-100 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-royal-500">
            The Process
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Your Learning Journey
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-royal-500/40 via-violet-500/40 to-cyan-400/40 sm:block" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-royal-500 via-violet-500 to-cyan-400 sm:block"
          />

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex items-start gap-6 pl-0 sm:pl-0"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-500 to-violet-500 font-display text-lg font-extrabold text-white shadow-lg shadow-royal-500/30">
                  {step.n}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-bold text-ink-900 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-600 sm:text-base">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
