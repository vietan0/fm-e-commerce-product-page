import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import cartLogo from './assets/images/icon-cart.svg';
import closeIcon from './assets/images/icon-close.svg';
import menuIcon from './assets/images/icon-menu.svg';
import avatar from './assets/images/image-avatar.png';
import sneakersLogo from './assets/images/logo.svg';

const links = ['Collections', 'Men', 'Women', 'About', 'Contact'];

const ulVariants = {
  open: {
    x: 0,
    transition: { staggerChildren: 0.06 },
  },
  closed: {
    x: -400,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      stiffness: 1000,
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

export default function Header() {
  const [hoverAnchor, setHoverAnchor] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const isSM = useMediaQuery({ query: '(min-width: 640px)' });

  function showUl() {
    let result;
    if (isSM)
      // big screen
      result = true;
    else {
      // small screen
      if (menuOpen) result = true;
      else result = false;
    }
    return result;
  }

  const linkElems = links.map((link) => (
    <motion.li
      variants={liVariants}
      key={link}
      className="relative flex flex-col"
    >
      <a
        href="#"
        className="z-10 px-6 py-4 font-bold text-grey-blue-50 hover:text-orange sm:px-3 sm:py-8 sm:text-sm sm:font-normal"
        onMouseEnter={() => setHoverAnchor(link)}
      >
        {link}
      </a>
      {hoverAnchor === link && (
        <motion.div
          layoutId="underline"
          transition={{ duration: 0.15 }}
          className={clsx(
            menuOpen ? 'border-l-4' : 'border-b-4',
            'absolute bottom-0 left-0 h-full w-full border-orange bg-grey-blue-98/60',
          )}
        />
      )}
    </motion.li>
  ));

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky flex w-full max-w-screen-lg justify-between gap-4 border-b-2 bg-white px-4 xs:gap-0 sm:px-6 lg:px-0"
    >
      <nav className="flex items-center xs:gap-2 md:gap-8 lg:gap-12">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="mr-2 grid h-10 w-10 place-content-center rounded hover:bg-black/5 sm:hidden"
        >
          <img src={menuIcon} alt="" className="w-full" />
        </button>
        <a href="#">
          <img src={sneakersLogo} alt="" className="min-w-24 py-8" />
        </a>
        <AnimatePresence>
          {menuOpen && !isSM && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.3 } }}
              id="backdrop"
              className="fixed left-0 top-0 h-screen w-screen bg-black/25"
              onClick={() => setMenuOpen(false)}
            />
          )}
          {showUl() && (
            <motion.ul
              key="ul"
              initial="closed"
              animate="open"
              exit="closed"
              variants={ulVariants}
              onMouseLeave={() => setHoverAnchor('')}
              className="fixed left-4 top-4 flex h-[calc(100vh_-_2rem)] w-[calc(100vw_-_2rem)] flex-col rounded-lg bg-white py-4 xs:max-w-[368px] sm:static sm:h-auto sm:w-auto sm:max-w-full sm:flex-row sm:py-0"
            >
              <li id="button-container" className="mb-8 px-4 sm:hidden">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid h-10 w-10 place-content-center rounded hover:bg-grey-blue-98"
                >
                  <img src={closeIcon} alt="" />
                </button>
              </li>
              {linkElems}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
      <div id="right" className="flex items-center gap-4 lg:gap-8">
        <button className="grid h-8 w-8 place-content-center rounded-full outline outline-1 outline-grey-blue-75 hover:outline-none hover:outline-4 hover:outline-orange xs:h-10 xs:w-10">
          <img src={cartLogo} alt="" className="w-4 xs:w-5" />
        </button>
        <button className="grid h-8 w-8 place-content-center rounded-full hover:outline hover:outline-orange xs:h-10 xs:w-10">
          <img src={avatar} alt="" />
        </button>
      </div>
    </motion.header>
  );
}
