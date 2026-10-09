import { motion, useReducedMotion } from 'motion/react';

interface CallToActionButtonProps {
  label: string;
  /** `null` while no destination is wired up (FR-034). */
  destination: string | null;
}

/**
 * The course call to action (FR-033 … FR-036).
 *
 * When `destination` is null the button renders fully styled and ENABLED, but
 * does nothing. The three obvious shortcuts are all wrong for specific reasons
 * (research.md R-008):
 *
 *   <a href="#">    scrolls the page to the top on click, violating FR-035's
 *                   "page MUST remain in its current state".
 *   <div> + styles  is not keyboard-focusable and is not announced as a button,
 *                   violating FR-031.
 *   disabled        is skipped by keyboard navigation and reads as broken, when
 *                   the intent is a working-looking button whose destination
 *                   simply is not wired yet.
 *
 * So: a real <button type="button">, enabled, focusable, correctly announced,
 * with no side effect. Setting `destination` to a URL in site.ts switches this
 * to an <a> with no visual or positional change.
 */
export default function CallToActionButton({ label, destination }: CallToActionButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const className =
    'inline-flex items-center justify-center rounded-full bg-sprout-700 px-8 py-3.5 ' +
    'text-base font-semibold text-white shadow-sm transition-colors ' +
    'hover:bg-sprout-800 active:bg-sprout-900';

  const hover = prefersReducedMotion ? undefined : { scale: 1.03 };
  const tap = prefersReducedMotion ? undefined : { scale: 0.98 };
  const transition = { type: 'spring' as const, stiffness: 400, damping: 28 };

  if (destination) {
    return (
      <motion.a
        href={destination}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        whileHover={hover}
        whileTap={tap}
        transition={transition}
      >
        {label}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      whileHover={hover}
      whileTap={tap}
      transition={transition}
      // Intentionally inert: no navigation, no scroll change, no DOM mutation,
      // no error. Repeated clicks accumulate nothing (FR-035).
      onClick={() => {}}
    >
      {label}
    </motion.button>
  );
}
