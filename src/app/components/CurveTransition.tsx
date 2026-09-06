"use client";
import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * White curve that retracts as a section scrolls out.
 *
 * Driven by scaleY rather than height: animating height forces a layout +
 * paint on every scroll frame, which is what made this stutter on phones.
 * A transform stays on the compositor.
 */
export default function CurveTransition({ progress }: { progress: MotionValue<number> }) {
    const scaleY = useTransform(progress, [0, 0.9], [1, 0]);

    return (
        <div className="relative mt-[100px] h-[50px]">
            <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="absolute inset-0 will-change-transform"
            >
                <div className="h-[1400%] w-full rounded-b-[50%] bg-white z-[10] absolute shadow-[0px_60px_50px_rgba(0,0,0,0.748)]" />
            </motion.div>
        </div>
    );
}
