import { GraduationCap, Phone, MapPin } from "lucide-react";
import { NAV_LINKS } from "../data/courses";
import { PHONE_DISPLAY, PHONE_TEL, ADDRESS } from "../data/contact";

export default function Footer() {
  return (
    <footer className="bg-navy-950 pt-16 pb-8 text-white/70">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-royal-500 to-violet-500 text-white">
                <GraduationCap size={20} />
              </span>
              <span className="font-display text-lg font-bold text-white">
                Swastik Institution
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Building Strong Foundations. Creating Brighter Futures.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-cyan-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Courses
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>Classes 1–10</li>
              <li>Classes 11–12 Non-Medical</li>
              <li>Spoken English</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={PHONE_TEL} className="flex items-center gap-2 transition-colors hover:text-cyan-300">
                  <Phone size={16} /> {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" /> {ADDRESS}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © 2026 Swastik Institution. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
