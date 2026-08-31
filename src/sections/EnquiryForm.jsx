import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  BookOpen,
  GraduationCap,
  PenLine,
  Sigma,
  MessageCircle,
  Loader2,
  User,
  Mail,
  Phone,
  School,
  BookMarked,
  MessageSquare,
  Check,
  ChevronDown,
} from "lucide-react";
import { WHATSAPP_LINK, PHONE_DISPLAY } from "../data/contact";

// ── Web3Forms access key ──────────────────────────────────────────────
// Replace this with your real Web3Forms access key.
// Get one free at https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = "aef7fd15-5971-46ac-866b-a619ae8b10c5";

// ── Options ───────────────────────────────────────────────────────────
const CLASS_OPTIONS = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

const SUBJECT_OPTIONS = [
  "English",
  "Hindi",
  "Punjabi",
  "Social Science",
  "Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Spoken English",
];

// ── Validation helpers ────────────────────────────────────────────────
const PHONE_REGEX = /^(\+91[\s-]?)?[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 2)
    errors.name = "Please enter your full name (at least 2 characters).";
  if (!values.email || !EMAIL_REGEX.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.phone || !PHONE_REGEX.test(values.phone.replace(/\s/g, "")))
    errors.phone = "Please enter a valid Indian mobile number.";
  if (!values.studentClass) errors.studentClass = "Please select a class.";
  if (!values.courses || values.courses.length === 0)
    errors.courses = "Please select at least one subject/course.";
  return errors;
}

// ── Floating 3D decorations ───────────────────────────────────────────
const FLOATERS = [
  { Icon: BookOpen, top: "8%", left: "5%", size: 28, delay: 0 },
  { Icon: GraduationCap, top: "18%", right: "6%", size: 32, delay: 0.7 },
  { Icon: PenLine, bottom: "22%", left: "4%", size: 24, delay: 1.2 },
  { Icon: Sigma, bottom: "12%", right: "5%", size: 26, delay: 0.4 },
];

// ── Field wrapper ─────────────────────────────────────────────────────
function Field({ id, label, icon: IconComp, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-white/90"
      >
        <IconComp size={15} className="text-cyan-300/80" aria-hidden="true" />
        {label}
      </label>
      {children}
      {error && (
        <p
          className="mt-1 flex items-center gap-1 text-xs text-red-400"
          role="alert"
        >
          <AlertCircle size={13} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Shared input classes ──────────────────────────────────────────────
const inputBase =
  "w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3.5 text-sm text-white placeholder-white/40 backdrop-blur-sm transition-all duration-300 outline-none form-glow focus:border-cyan-400/50 focus:bg-white/12";

const selectBase =
  "w-full cursor-pointer appearance-none rounded-xl border border-white/15 bg-white/8 px-4 py-3.5 text-sm text-white backdrop-blur-sm transition-all duration-300 outline-none form-glow focus:border-cyan-400/50 focus:bg-white/12";

// ── Multi-select checkbox dropdown ────────────────────────────────────
function MultiSelectDropdown({ id, options, selected, onChange, onBlur, hasError, placeholder }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => {
    setOpen((o) => {
      const next = !o;
      if (o) onBlur?.(); // closing -> mark as touched
      return next;
    });
  };

  const toggleOption = (option) => {
    const isSelected = selected.includes(option);
    const next = isSelected
      ? selected.filter((s) => s !== option)
      : [...selected, option];
    onChange(next);
  };

  const summary =
    selected.length === 0
      ? placeholder
      : selected.length <= 2
        ? selected.join(", ")
        : `${selected.length} subjects selected`;

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        id={id}
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${selectBase} flex items-center justify-between text-left ${selected.length === 0 ? "text-white/40" : ""
          } ${hasError ? "border-red-400/60" : ""}`}
      >
        <span className="truncate">{summary}</span>
        <ChevronDown
          size={16}
          className={`ml-2 shrink-0 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/15 bg-navy-900/95 shadow-2xl shadow-navy-950/50 backdrop-blur-md"
        >
          <ul className="max-h-64 overflow-y-auto py-1.5">
            {options.map((option) => {
              const checked = selected.includes(option);
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={checked}
                    onClick={() => toggleOption(option)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-white/90 transition-colors hover:bg-white/8"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${checked
                        ? "border-cyan-400 bg-cyan-400/90 text-navy-950"
                        : "border-white/25 bg-white/5"
                        }`}
                    >
                      {checked && <Check size={13} strokeWidth={3} />}
                    </span>
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
export default function EnquiryForm() {
  const formRef = useRef(null);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    studentClass: "",
    courses: [],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [touched, setTouched] = useState({});

  const set = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((e) => {
        const copy = { ...e };
        delete copy[field];
        return copy;
      });
    }
  };

  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));

  // ── Submit ────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, phone: true, studentClass: true, courses: true });

    if (Object.keys(validationErrors).length > 0) {
      // Focus the first invalid field
      const firstKey = Object.keys(validationErrors)[0];
      const fieldMap = { name: "enquiry-name", email: "enquiry-email", phone: "enquiry-phone", studentClass: "enquiry-class", courses: "enquiry-course" };
      document.getElementById(fieldMap[firstKey])?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New Admission Enquiry - Swastik Institution",
        from_name: "Swastik Institution",
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        class: values.studentClass,
        courses: values.courses.join(", "),
        message: values.message.trim() || "(No message)",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setValues({ name: "", email: "", phone: "", studentClass: "", courses: [], message: "" });
        setTouched({});
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // ── Success state ─────────────────────────────────────────────────
  if (status === "success") {
    return (
      <section
        id="enquire"
        className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-indigo-500/20 pt-32 pb-24 sm:pt-40 sm:pb-32"
      >
        {/* particles */}
        <Particles />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-lg px-6 text-center"
        >
          <div className="gradient-border mx-auto rounded-3xl glass p-10 sm:p-14 shadow-2xl shadow-navy-950/40">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle size={40} className="text-emerald-400" strokeWidth={1.8} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
              Enquiry Received!
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              Thank you for contacting Swastik Institution! Your enquiry has been received. Our team will get in touch with you soon.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp Us
              </a>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // ── Form state ────────────────────────────────────────────────────
  return (
    <section
      id="enquire"
      className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-indigo-500/20 pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* ambient particles */}
      <Particles />

      {/* floating 3D decorations (hidden on small screens) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {FLOATERS.map(({ Icon, size, delay, ...pos }, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{ ...pos, animationDelay: `${delay}s`, "--r": `${i % 2 === 0 ? 6 : -6}deg` }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass text-cyan-300/60 shadow-xl shadow-navy-950/30">
              <Icon size={size} strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>

      {/* background glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-royal-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* ── Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            Admission Enquiry
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.75rem]">
            Start Your{" "}
            <span className="text-gradient">Learning Journey</span>
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            Tell us a little about yourself and our team will help you choose the right course.
          </p>
        </motion.div>

        {/* ── Form card ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="gradient-border rounded-3xl glass p-7 shadow-2xl shadow-navy-950/40 sm:p-10"
          >
            {/* Honeypot — hidden from users, catches bots */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* aria-live region for submission status */}
            <div aria-live="polite" className="sr-only">
              {status === "submitting" && "Submitting your enquiry…"}
              {status === "error" && "There was an error submitting your enquiry."}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* ── Applicant Name ───────────────────────────────── */}
              <Field
                id="enquiry-name"
                label="Applicant Name"
                icon={User}
                error={touched.name && errors.name}
              >
                <input
                  id="enquiry-name"
                  type="text"
                  required
                  minLength={2}
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  onBlur={() => touch("name")}
                  placeholder="Full name"
                  autoComplete="name"
                  className={`${inputBase} ${touched.name && errors.name ? "border-red-400/60" : ""}`}
                />
              </Field>

              {/* ── Email ────────────────────────────────────────── */}
              <Field
                id="enquiry-email"
                label="Email Address"
                icon={Mail}
                error={touched.email && errors.email}
              >
                <input
                  id="enquiry-email"
                  type="email"
                  required
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => touch("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`${inputBase} ${touched.email && errors.email ? "border-red-400/60" : ""}`}
                />
              </Field>

              {/* ── Phone ────────────────────────────────────────── */}
              <Field
                id="enquiry-phone"
                label="Phone Number"
                icon={Phone}
                error={touched.phone && errors.phone}
              >
                <input
                  id="enquiry-phone"
                  type="tel"
                  required
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onBlur={() => touch("phone")}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className={`${inputBase} ${touched.phone && errors.phone ? "border-red-400/60" : ""}`}
                />
              </Field>

              {/* ── Class ────────────────────────────────────────── */}
              <Field
                id="enquiry-class"
                label="Class"
                icon={School}
                error={touched.studentClass && errors.studentClass}
              >
                <div className="relative">
                  <select
                    id="enquiry-class"
                    required
                    value={values.studentClass}
                    onChange={(e) => set("studentClass", e.target.value)}
                    onBlur={() => touch("studentClass")}
                    className={`${selectBase} ${!values.studentClass ? "text-white/40" : ""} ${touched.studentClass && errors.studentClass ? "border-red-400/60" : ""}`}
                  >
                    <option value="" disabled>
                      Select class
                    </option>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c} className="bg-navy-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </Field>

              {/* ── Course / Subjects (multi-select) ─────────────── */}
              <div className="sm:col-span-2">
                <Field
                  id="enquiry-course"
                  label="Subjects / Course Interested In"
                  icon={BookMarked}
                  error={touched.courses && errors.courses}
                >
                  <MultiSelectDropdown
                    id="enquiry-course"
                    options={SUBJECT_OPTIONS}
                    selected={values.courses}
                    onChange={(next) => set("courses", next)}
                    onBlur={() => touch("courses")}
                    hasError={touched.courses && !!errors.courses}
                    placeholder="Select one or more subjects"
                  />
                </Field>
              </div>

              {/* ── Message ──────────────────────────────────────── */}
              <div className="sm:col-span-2">
                <Field id="enquiry-message" label="Message (Optional)" icon={MessageSquare}>
                  <textarea
                    id="enquiry-message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Tell us anything you'd like to know..."
                    className={`${inputBase} resize-none`}
                  />
                </Field>
              </div>
            </div>

            {/* ── Error banner ─────────────────────────────────── */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
                <p className="text-sm text-red-300">
                  Something went wrong. Please try again or contact us directly at{" "}
                  <a href="tel:7889169106" className="font-semibold underline">
                    {PHONE_DISPLAY}
                  </a>
                  .
                </p>
              </motion.div>
            )}

            {/* ── Submit ───────────────────────────────────────── */}
            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-royal-500 to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-royal-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-royal-500/40 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {/* shimmer overlay */}
                <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    Submit Enquiry
                  </>
                )}
              </button>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 px-6 py-3 text-sm font-semibold text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/10 hover:-translate-y-0.5"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// ── Particles sub-component ─────────────────────────────────────────
function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cyan-400/40 animate-pulse-glow"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            top: `${(i * 31) % 100}%`,
            left: `${(i * 47) % 100}%`,
            animationDelay: `${(i % 7) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}
