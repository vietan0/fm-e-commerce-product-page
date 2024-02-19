import { motion } from 'framer-motion';
import useResizeObserver from 'use-resize-observer';

export default function Banner() {
  const { ref, width } = useResizeObserver();
  return (
    <div
      ref={ref}
      className="sticky top-0 z-20 h-6 overflow-hidden bg-pale-orange text-grey-blue-10"
    >
      <motion.span
        initial={{ x: -320 }}
        animate={{
          x: width,
          transition: {
            duration: width! > 840 ? 32 : width! > 400 ? 24 : 16,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
        className="absolute top-1 inline-block whitespace-nowrap text-[0.7rem] font-bold tracking-wide"
      >
        Challenge by{' '}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          className="underline duration-100 hover:text-orange"
        >
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a
          className="underline duration-100 hover:text-orange"
          href="https://github.com/vietan0"
        >
          Việt An
        </a>
        .
      </motion.span>
    </div>
  );
}
