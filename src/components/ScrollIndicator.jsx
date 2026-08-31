import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Animated "scroll down" cue — a mouse icon with a bouncing wheel dot.
 * Fades in after the hero content settles, and fades out once the user
 * actually starts scrolling so it doesn't linger and distract.
 */
export default function ScrollIndicator({ className = "" }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY < 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.6 }}
                    className={`pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8 ${className}`}
                >
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                        Scroll
                    </span>

                    <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5 sm:h-10 sm:w-6">
                        <motion.span
                            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                        />
                    </div>

                    <motion.span
                        className="text-white/40"
                        animate={{ y: [0, 4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
