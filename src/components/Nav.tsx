import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';

import closeIcon from '../assets/images/icon-close.svg';
import menuIcon from '../assets/images/icon-menu.svg';
import sneakersLogo from '../assets/images/logo.svg';

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

export default function Nav() {
  const [hoverAnchor, setHoverAnchor] = useState('');
  const [mobileUlOpen, setMobileUlOpen] = useState(false);
  const isSM = useMediaQuery({ query: '(min-width: 640px)' });

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
            mobileUlOpen ? 'border-l-4' : 'border-b-4',
            'absolute bottom-0 left-0 h-full w-full border-orange bg-grey-blue-98/60',
          )}
        />
      )}
    </motion.li>
  ));

  const desktopUl = (
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
          onClick={() => setMobileUlOpen(false)}
          className="grid h-10 w-10 place-content-center rounded hover:bg-grey-blue-98"
        >
          <img src={closeIcon} alt="" />
        </button>
      </li>
      {linkElems}
    </motion.ul>
  );

  const mobileUl = createPortal(
    <AnimatePresence>
      {mobileUlOpen && (
        <div id="MobileUl">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            id="backdrop"
            className="fixed left-0 top-0 h-screen w-screen bg-black/25"
            onClick={() => setMobileUlOpen(false)}
          />
          {desktopUl}
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );

  return (
    <nav className="flex items-center xs:gap-2 md:gap-8 lg:gap-12">
      <button
        onClick={() => setMobileUlOpen((prev) => !prev)}
        className="mr-2 grid h-10 w-10 place-content-center rounded hover:bg-black/5 sm:hidden"
      >
        <img src={menuIcon} alt="" className="w-full" />
      </button>
      <a href="#">
        <img
          src={sneakersLogo}
          alt=""
          className="max-w-24 py-5 xs:max-w-none xs:py-8"
        />
      </a>
      {isSM ? desktopUl : mobileUl}
    </nav>
  );
}
