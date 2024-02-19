import { motion } from 'framer-motion';
import useResizeObserver from 'use-resize-observer';

import Nav from './Nav';
import UserTools from './UserTools';

export default function Header() {
  const { ref, width } = useResizeObserver();
  return (
    <>
      <div ref={ref} className="relative h-6 overflow-hidden bg-pale-orange">
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
          className="absolute top-1 inline-block whitespace-nowrap text-[0.7rem] font-bold tracking-wide text-orange"
        >
          Use code CONEBONE69 to get 20% off at{' '}
          <a
            href="https://www.youtube.com/watch?v=0_zA4szLY2k"
            target="_blank"
            className="text-grey-blue-10 underline hover:text-orange"
          >
            luxebidet.com
          </a>
        </motion.span>
      </div>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky flex w-full max-w-screen-xl justify-between gap-4 border-b-2 bg-white px-4 xs:gap-0 sm:px-6 xl:px-0"
      >
        <Nav />
        <UserTools />
      </motion.header>
    </>
  );
}
