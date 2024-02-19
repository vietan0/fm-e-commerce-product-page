import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import useResizeObserver from 'use-resize-observer';

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
  const isSM = useMediaQuery({
    query: '(min-width: 640px)',
  });

  const { ref, height: imgContainerHeight } =
    useResizeObserver<HTMLDivElement>();

  return (
    <div className="relative my-auto flex flex-col gap-4">
      <motion.div
        ref={ref}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={clsx(
          inModal || 'xs:hover:cursor-pointer sm:rounded-xl',
          'relative grid w-screen place-content-center overflow-hidden xs:w-auto',
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
      </motion.div>
      <div className="absolute w-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'prev' });
          }}
          className={clsx(
            inModal || !isSM ? 'left-4' : '-left-4',
            'absolute grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-white shadow-lg outline outline-1 outline-grey-blue-93 duration-100 hover:scale-110 hover:outline-orange',
          )}
          style={{ top: imgContainerHeight ? imgContainerHeight / 2 : 0 }}
        >
          <img src={prevIcon} width={7} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: 'next' });
          }}
          className={clsx(
            inModal || !isSM ? 'right-4' : '-right-4',
            'absolute grid h-8 w-8 -translate-y-1/2 place-content-center rounded-full bg-white shadow-lg outline outline-1 outline-grey-blue-93 duration-100 hover:scale-110 hover:outline-orange',
          )}
          style={{ top: imgContainerHeight ? imgContainerHeight / 2 : 0 }}
        >
          <img src={nextIcon} width={7} />
        </button>
      </div>
      {isXS && (
        <motion.div
          initial="init"
          animate="stagger"
          variants={thumbParentVarients}
          className={clsx(
            inModal || 'sm:px-0',
            'mx-auto flex max-w-96 justify-center gap-2 px-4 xs:gap-4',
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
                className="rounded-sm duration-100 hover:opacity-70 sm:rounded-md"
              />
              {i === index && (
                <motion.div
                  layoutId={inModal ? 'selected-img-modal' : 'selected-img'}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-0 h-full w-full rounded-sm outline outline-[3px] outline-orange sm:rounded-md"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
