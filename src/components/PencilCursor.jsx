import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom pencil cursor for desktop (mouse) users.
 * - The pencil glyph follows the pointer with a soft spring lag.
 * - It tilts toward the direction of travel, like it's actively writing.
 * - A lightweight canvas layer draws a fading "graphite dust" trail behind it.
 * - Automatically disabled on touch devices, and hidden while a native
 *   text cursor (inputs/textareas) would be more useful.
 */
export default function PencilCursor() {
    const [enabled] = useState(() => {
        if (typeof window === "undefined") return false;
        const isFine = window.matchMedia("(pointer: fine)").matches;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        return isFine && !prefersReducedMotion;
    });
    const [hidden, setHidden] = useState(true);
    const [pressed, setPressed] = useState(false);
    const canvasRef = useRef(null);
    const pointsRef = useRef([]);
    const rafRef = useRef(null);
    const lastPos = useRef({ x: 0, y: 0 });

    // Raw + spring-smoothed position for the pencil glyph
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springX = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 });
    const springY = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 });

    // Rotation follows the direction of movement
    const rotate = useMotionValue(-45);
    const springRotate = useSpring(rotate, { stiffness: 300, damping: 30 });

    // Only enable on devices with a real mouse (not touch/coarse pointers),
    // and never for users who've asked for reduced motion — determined once
    // above via lazy state initialization.


    useEffect(() => {
        if (!enabled) return;

        document.documentElement.classList.add("pencil-cursor-active");

        const handleMove = (e) => {
            setHidden(false);
            rawX.set(e.clientX);
            rawY.set(e.clientY);

            const dx = e.clientX - lastPos.current.x;
            const dy = e.clientY - lastPos.current.y;
            if (Math.abs(dx) + Math.abs(dy) > 2) {
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                rotate.set(angle + 45); // +45 to align pencil tip with travel direction
            }
            lastPos.current = { x: e.clientX, y: e.clientY };

            // Drop a graphite point on every move event (canvas loop fades it out)
            pointsRef.current.push({ x: e.clientX, y: e.clientY, life: 1 });
            if (pointsRef.current.length > 140) pointsRef.current.shift();
        };

        const handleLeave = () => setHidden(true);
        const handleEnter = () => setHidden(false);
        const handleDown = () => setPressed(true);
        const handleUp = () => setPressed(false);

        // Detect hovering text inputs so the native text cursor still works there
        const handleOverIn = (e) => {
            const el = e.target;
            if (el.closest && el.closest("input, textarea, select, [contenteditable='true']")) {
                setHidden(true);
            }
        };
        const handleOverOut = (e) => {
            const el = e.target;
            if (el.closest && el.closest("input, textarea, select, [contenteditable='true']")) {
                setHidden(false);
            }
        };

        window.addEventListener("mousemove", handleMove, { passive: true });
        document.addEventListener("mouseleave", handleLeave);
        document.addEventListener("mouseenter", handleEnter);
        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);
        document.addEventListener("mouseover", handleOverIn, true);
        document.addEventListener("mouseout", handleOverOut, true);

        return () => {
            document.documentElement.classList.remove("pencil-cursor-active");
            window.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseleave", handleLeave);
            document.removeEventListener("mouseenter", handleEnter);
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", handleUp);
            document.removeEventListener("mouseover", handleOverIn, true);
            document.removeEventListener("mouseout", handleOverOut, true);
        };
    }, [enabled, rawX, rawY, rotate]);

    // Canvas render loop for the fading graphite trail
    useEffect(() => {
        if (!enabled) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const pts = pointsRef.current;
            for (let i = pts.length - 1; i >= 0; i--) {
                const p = pts[i];
                p.life -= 0.035;
                if (p.life <= 0) {
                    pts.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.4 * p.life + 0.3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(120, 130, 150, ${p.life * 0.35})`;
                ctx.fill();
            }
            rafRef.current = requestAnimationFrame(draw);
        };
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <canvas
                ref={canvasRef}
                className="pointer-events-none fixed inset-0 z-[9998]"
                aria-hidden="true"
            />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999]"
                style={{
                    x: springX,
                    y: springY,
                    opacity: hidden ? 0 : 1,
                    rotate: springRotate,
                }}
                animate={{ scale: pressed ? 0.85 : 1 }}
                transition={{ scale: { duration: 0.15 } }}
            >
                {/* Pencil tip is anchored near the SVG's bottom-left point (the cursor "hotspot") */}
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ transform: "translate(-4px, -20px)" }}
                >
                    <path
                        d="M3 21l1.6-5.6L15.8 4.2a1.5 1.5 0 0 1 2.1 0l1.9 1.9a1.5 1.5 0 0 1 0 2.1L8.6 19.4 3 21z"
                        fill="#F4C542"
                        stroke="#1E1B1B"
                        strokeWidth="1.1"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14.3 5.7l4 4"
                        stroke="#1E1B1B"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                    />
                    <path
                        d="M3 21l1.6-5.6 4 4L3 21z"
                        fill="#E8E2D6"
                        stroke="#1E1B1B"
                        strokeWidth="1.1"
                        strokeLinejoin="round"
                    />
                    <path d="M3 21l1-3.5 2.5 2.5L3 21z" fill="#2A2A2A" />
                </svg>
            </motion.div>
        </>
    );
}
