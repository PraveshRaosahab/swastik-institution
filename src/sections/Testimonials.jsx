import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const PLACEHOLDERS = [
  "I truly appreciate the friendly atmosphere here. From faculty to administration, everyone is dedicated to helping students succeed. It feels like a second home where my growth is valued.",
  "My son has shown so much improvement in his confidence and communication skills. The supportive environment and experienced teachers have truly made a difference. Highly recommended!",
  "The faculty is always approachable. I feel more confident in my abilities than ever before. The best decision was joining Swastik Institute!",
];

export default function Testimonials() {
  return (
    <section className="relative bg-mist-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-royal-500">
            Sample Student Feedback
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            What Students Will Share
          </h2>
          <p className="mt-3 text-sm text-ink-400">
            Feedback from Students and Parents.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PLACEHOLDERS.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="gradient-border rounded-2xl bg-white p-7 shadow-sm shadow-ink-900/5"
            >
              <Quote className="text-royal-500/40" size={28} />
              <p className="mt-4 text-sm italic leading-relaxed text-ink-500">
                “{text}”
              </p>
              {/* <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-royal-500/30 to-violet-500/30" />
                <div>
                  <p className="text-xs font-semibold text-ink-400">Demo Placeholder</p>
                  <p className="text-[11px] text-ink-400/70">Not a real review</p>
                </div>
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
