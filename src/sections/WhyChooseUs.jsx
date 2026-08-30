import { motion } from "framer-motion";
import {
  Brain,
  UserCheck,
  Layers,
  MessagesSquare,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const FEATURES = [
  {
    Icon: Brain,
    title: "Strong Fundamentals",
    text: "Focus on understanding concepts instead of rote learning.",
  },
  {
    Icon: UserCheck,
    title: "Student-Focused Learning",
    text: "Learning designed around clarity, confidence, and progress.",
  },
  {
    Icon: Layers,
    title: "Complete Academic Support",
    text: "Courses available from foundational classes through senior secondary education.",
  },
  {
    Icon: MessagesSquare,
    title: "Communication Skills",
    text: "Spoken English training to help students communicate confidently.",
  },
  {
    Icon: Lightbulb,
    title: "Clear Concepts",
    text: "Make difficult topics easier to understand through structured teaching.",
  },
  {
    Icon: TrendingUp,
    title: "Growth Mindset",
    text: "Encourage curiosity, consistency, discipline, and continuous improvement.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative bg-mist-50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-royal-500">
            Why Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Why Choose Swastik Institution?
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white p-7 shadow-sm shadow-ink-900/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-royal-500/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal-500/10 text-royal-600">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
