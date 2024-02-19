import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import Nav from './Nav';
import UserTools from './UserTools';

export default function Header() {
  const isSM = useMediaQuery({ query: '(min-width: 640px)' });
  return (
    <>
      <div className="relative h-6 bg-pale-orange">
        <motion.span
          initial={{ x: isSM ? '-40vw' : '-80vw' }}
          animate={{
            x: '120vw',
            transition: {
              duration: 16,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            },
          }}
          className="absolute top-1 inline-block whitespace-nowrap text-[0.7rem] font-bold tracking-wide text-orange"
        >
          Use code CONEBONE69 to get 20% off at{' '}
          <a href="https://www.youtube.com/watch?v=0_zA4szLY2k" target="_blank">
            luxebidet.com
          </a>
        </motion.span>
      </div>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky flex w-full max-w-screen-lg justify-between gap-4 border-b-2 bg-white px-4 xs:gap-0 sm:px-6 lg:px-0"
      >
        <Nav />
        <UserTools />
      </motion.header>
    </>
  );
}
