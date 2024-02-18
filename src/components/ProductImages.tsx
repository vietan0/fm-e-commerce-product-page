import clsx from 'clsx';
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
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={clsx(
          inModal || 'xs:hover:cursor-pointer sm:rounded-xl',
          'relative w-screen overflow-hidden xs:w-auto grid place-content-center',
        )}
        onClick={inModal ? undefined : isXS ? onOpen : undefined}
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
            className={clsx(
              inModal ? 'object-contain' : 'object-cover',
              'max-h-[300px] xs:max-h-[500px]',
            )}
          />
        </AnimatePresence>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'prev' });
          }}
          className="absolute left-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-white/75 shadow-lg duration-100 hover:scale-110 hover:bg-white/100"
        >
          <img src={prevIcon} width={7} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'next' });
          }}
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
          className={clsx(
            inModal || 'sm:px-0',
            'flex justify-center gap-2 px-4 xs:gap-4',
          )}
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
                  layoutId={inModal ? 'selected-img-modal' : 'selected-img'}
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
