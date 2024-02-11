import { motion } from 'framer-motion';
import { useState } from 'react';

import cartLogo from './assets/images/icon-cart.svg';
import avatar from './assets/images/image-avatar.png';
import sneakersLogo from './assets/images/logo.svg';

const links = ['Collections', 'Men', 'Women', 'About', 'Contact'];

export default function Header() {
  const [hoverAnchor, setHoverAnchor] = useState('');

  const linkElems = links.map((link) => (
    <li key={link} className="relative flex flex-col px-3 text-grey-blue-50">
      <a
        href="#"
        className="py-8 text-sm"
        onMouseEnter={() => setHoverAnchor(link)}
      >
        {link}
      </a>
      {hoverAnchor === link && (
        <motion.div
          layoutId="underline"
          transition={{ duration: 0.15 }}
          className="absolute bottom-0 left-0 h-[2px] w-full bg-orange"
        />
      )}
    </li>
  ));

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky flex w-full max-w-screen-lg justify-between gap-2 border-b-2 px-8 lg:px-0"
    >
      <nav className="flex items-center gap-4 md:gap-8 lg:gap-12">
        <a href="#">
          <img src={sneakersLogo} alt="" className="min-w-24" />
        </a>
        <ul className="flex" onMouseLeave={() => setHoverAnchor('')}>
          {linkElems}
        </ul>
      </nav>
      <div id="right" className="flex items-center gap-4 lg:gap-8">
        <button className="grid h-10 w-10 place-content-center rounded-full outline outline-1 outline-grey-blue-75">
          <img src={cartLogo} alt="" />
        </button>
        <button className="grid h-10 w-10 place-content-center rounded-full hover:outline hover:outline-orange">
          <img src={avatar} alt="" />
        </button>
      </div>
    </motion.header>
  );
}
