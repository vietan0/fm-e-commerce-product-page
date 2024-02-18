import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import nextIcon from '../assets/images/icon-next.svg';
import prevIcon from '../assets/images/icon-previous.svg';
import { Gallery, GalleryAction } from '../galleryReducer';
import productImgs from '../productImgs';

const galleryVariants = {
  enter: (direction: Gallery['direction']) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.5,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: Gallery['direction']) => ({
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

type Props = {
  inModal?: boolean;
  index: number;
  direction: Gallery['direction'];
  dispatch: React.Dispatch<GalleryAction>;
  onOpen: () => void;
};

export default function ProductImages({
  inModal = false,
  index,
  direction,
  dispatch,
  onOpen,
}: Props) {
  const isXS = useMediaQuery({
    query: '(min-width: 400px)',
  });

  return (
    <div className="flex flex-col gap-3 sm:gap-8">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-screen overflow-hidden xs:w-auto sm:rounded-xl"
        onClick={inModal ? undefined : onOpen}
      >
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <motion.img
            custom={direction}
            key={productImgs[index].full}
            initial="enter"
            animate="center"
            exit="exit"
            variants={galleryVariants}
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
          className="absolute left-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-white/75 shadow-lg duration-100 hover:scale-110 hover:bg-white/100"
        >
          <img src={prevIcon} width={7} />
        </button>
        <button
          onClick={() => dispatch({ type: 'next' })}
          className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-white/75 shadow-lg duration-100 hover:scale-110 hover:bg-white/100"
        >
          <img src={nextIcon} width={7} />
        </button>
      </motion.button>
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
