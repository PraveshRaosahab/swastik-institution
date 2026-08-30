import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Sigma, MessagesSquare } from "lucide-react";
import { COURSES } from "../data/courses";

const ICONS = { BookOpen, Sigma, MessagesSquare };

function CourseCard({ course, index }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Icon = ICONS[course.icon];

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="scene"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="gradient-border group relative h-full rounded-3xl bg-white/80 p-8 shadow-lg shadow-ink-900/5 backdrop-blur-sm transition-transform duration-300 ease-out hover:shadow-2xl hover:shadow-royal-500/15"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-500 to-violet-500 text-white shadow-md shadow-royal-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon size={26} strokeWidth={1.8} />
        </div>

        <span className="mt-6 inline-block rounded-full bg-royal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-royal-600">
          {course.badge}
        </span>

        <h3 className="mt-4 font-display text-2xl font-bold text-ink-900">
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
          {course.description}
        </p>

        <a
          href="#contact"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 transition-colors group-hover:text-royal-500"
        >
          Enquire Now
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  return (
    <section id="courses" className="relative bg-mist-100 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-royal-500">
            Courses
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Courses Designed for Every Learning Stage
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3">
          {COURSES.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
