import { motion, useReducedMotion } from 'motion/react';

interface ScrollCueProps {
  label: string;
  /** Anchor the cue scrolls to. */
  href: string;
}

/**
 * The "there is more below" cue (FR-007).
 *
 * Rendered as a real anchor so keyboard users get the same affordance as the
 * visual one, with the accessible name coming from the content label. The arrow
 * is decorative and hidden from assistive tech (FR-027, FR-031).
 */
export default function ScrollCue({ label, href }: ScrollCueProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <a
      href={href}
      className="group inline-flex flex-col items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-sprout-700"
    >
      <span>{label}</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        aria-hidden="true"
        focusable="false"
        animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <path
          d="M12 5v14m0 0l-6-6m6 6l6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </a>
  );
}
