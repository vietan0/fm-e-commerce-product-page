import { AnimatePresence, motion } from 'framer-motion';
import { useReducer } from 'react';
import { useMediaQuery } from 'react-responsive';

import nextIcon from './assets/images/icon-next.svg';
import prevIcon from './assets/images/icon-previous.svg';
import full1 from './assets/images/image-product-1.jpg';
import thumbnail1 from './assets/images/image-product-1-thumbnail.jpg';
import full2 from './assets/images/image-product-2.jpg';
import thumbnail2 from './assets/images/image-product-2-thumbnail.jpg';
import full3 from './assets/images/image-product-3.jpg';
import thumbnail3 from './assets/images/image-product-3-thumbnail.jpg';
import full4 from './assets/images/image-product-4.jpg';
import thumbnail4 from './assets/images/image-product-4-thumbnail.jpg';

const productImgs = [
  {
    full: full1,
    thumbnail: thumbnail1,
  },
  {
    full: full2,
    thumbnail: thumbnail2,
  },
  {
    full: full3,
    thumbnail: thumbnail3,
  },
  {
    full: full4,
    thumbnail: thumbnail4,
  },
];

type ImgGallery = { index: number; direction: 1 | -1 };
type Action = { type: 'prev' | 'next' } | { type: 'choose'; payload: number };

function reducer(prev: ImgGallery, action: Action): ImgGallery {
  let index: ImgGallery['index'];
  let direction: ImgGallery['direction'];
  switch (action.type) {
    case 'prev':
      direction = -1;
      index = prev.index === 0 ? productImgs.length - 1 : prev.index - 1;
      break;
    case 'next':
      direction = 1;
      index = prev.index === productImgs.length - 1 ? 0 : prev.index + 1;
      break;
    default:
      direction = action.payload > prev.index ? 1 : -1;
      index = action.payload;
  }
  return { index, direction };
}

const variants = {
  enter: (direction: ImgGallery['direction']) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.5,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: ImgGallery['direction']) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0.5,
  }),
};

const thumbParentVarients = {
  init: { transition: { staggerChildren: 0.06 } },
  stagger: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const thumbChildrenVarients = {
  init: { y: -100, opacity: 0 },
  stagger: { y: 0, opacity: 1 },
};

export default function ProductImages() {
  const [{ index, direction }, dispatch] = useReducer(reducer, {
    index: 0,
    direction: 1,
  });
  const isXS = useMediaQuery({
    query: '(min-width: 400px)',
  });

  return (
    <div className="flex flex-col gap-3 sm:gap-8">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-screen overflow-hidden xs:w-auto sm:rounded-xl"
      >
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <motion.img
            custom={direction}
            key={productImgs[index].full}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.2 }}
            src={productImgs[index].full}
            alt=""
            width={1000}
            height={1000}
            className="max-h-[300px] object-cover xs:max-h-[400px] sm:max-h-none"
          />
        </AnimatePresence>
        <button
          onClick={() => dispatch({ type: 'prev' })}
          className="absolute left-4 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-white/75 shadow-lg duration-100 hover:scale-110 hover:bg-white/100"
        >
          <img src={prevIcon} width={7} />
        </button>
        <button
          onClick={() => dispatch({ type: 'next' })}
          className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-white/75 shadow-lg duration-100 hover:scale-110 hover:bg-white/100"
        >
          <img src={nextIcon} width={7} />
        </button>
      </motion.div>
      {isXS && (
        <motion.div
          initial="init"
          animate="stagger"
          variants={thumbParentVarients}
          className="flex gap-2 px-4 xs:gap-4 sm:px-0"
        >
          {productImgs.map((obj, i) => (
            <motion.button
              variants={thumbChildrenVarients}
              key={i}
              className="relative h-fit"
              onClick={() => dispatch({ type: 'choose', payload: i })}
            >
              <img
                src={obj.thumbnail}
                key={i}
                alt=""
                className="rounded duration-100 hover:opacity-70 sm:rounded-md"
              />
              {i === index && (
                <motion.div
                  layoutId="selected-img-animate"
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 h-full w-full rounded outline outline-[3px] outline-orange sm:rounded-md"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
