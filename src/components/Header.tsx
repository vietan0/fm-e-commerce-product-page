import { motion } from 'framer-motion';

import Banner from './Banner';
import Nav from './Nav';
import UserTools from './UserTools';

export default function Header() {
  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }}>
      <Banner />
      <div className="flex w-full max-w-screen-xl justify-between gap-4 border-b-2 bg-white px-4 xs:gap-0 sm:px-6 xl:px-0">
        <Nav />
        <UserTools />
      </div>
    </motion.header>
  );
}
