import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, Phone } from "lucide-react";
import { NAV_LINKS } from "../data/courses";
import { PHONE_DISPLAY, PHONE_TEL } from "../data/contact";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      Boolean
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6"
    >
      <nav
        className={`w-full max-w-6xl flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled
            ? "mt-3 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-ink-900/5 shadow-lg shadow-navy-950/5"
            : "mt-4 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-navy-950/20"
        }`}
      >
        <a href="#home" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500 to-violet-500 text-white shadow-md shadow-royal-500/30 transition-transform group-hover:scale-105">
            <GraduationCap size={20} strokeWidth={2.2} />
          </span>
          <span className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${scrolled ? "text-ink-900" : "text-white"}`}>
            Swastik <span className={`transition-colors duration-300 ${scrolled ? "text-royal-500" : "text-cyan-400"}`}>Institution</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  active === link.href
                    ? scrolled
                      ? "text-royal-600"
                      : "text-cyan-400 font-semibold"
                    : scrolled
                      ? "text-ink-600 hover:text-ink-900"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 -z-10 rounded-full ${
                      scrolled ? "bg-royal-500/10" : "bg-white/15"
                    }`}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={PHONE_TEL}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
              scrolled
                ? "bg-gradient-to-r from-royal-500 to-indigo-500 text-white shadow-md shadow-royal-500/25 hover:shadow-lg"
                : "bg-white text-navy-950 shadow-md shadow-white/10 hover:bg-mist-100 hover:shadow-lg"
            }`}
          >
            <Phone size={16} /> Call Now
          </a>
        </div>

        <button
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${scrolled ? "text-ink-900" : "text-white"}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute top-20 left-4 right-4 md:hidden rounded-2xl p-5 shadow-xl transition-all duration-300 ${
              scrolled
                ? "glass-light border border-ink-900/5 shadow-ink-900/5"
                : "glass bg-navy-950/95 border-white/10 shadow-navy-950/50"
            }`}
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-300 ${
                      active === link.href
                        ? scrolled
                          ? "bg-royal-500/10 text-royal-600"
                          : "bg-white/10 text-cyan-400"
                        : scrolled
                          ? "text-ink-700 hover:bg-ink-900/5"
                          : "text-white/80 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={PHONE_TEL}
              className={`mt-3 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 shadow-md ${
                scrolled
                  ? "bg-gradient-to-r from-royal-500 to-indigo-500 text-white"
                  : "bg-white text-navy-950 hover:bg-mist-100"
              }`}
            >
              <Phone size={16} /> Call {PHONE_DISPLAY}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
