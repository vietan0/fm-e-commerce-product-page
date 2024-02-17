import clsx from 'clsx';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useReducer } from 'react';

import minusIcon from '../assets/images/icon-minus.svg';
import plusIcon from '../assets/images/icon-plus.svg';

type AmountCounter = {
  amountToAdd: number;
  direction: 'up' | 'down';
};
type Action = {
  type: 'plus' | 'minus';
};

function reducer(
  { amountToAdd }: AmountCounter,
  action: Action,
): AmountCounter {
  if (action.type === 'minus') {
    if (amountToAdd === 1) return { amountToAdd: 1, direction: 'down' };
    else return { amountToAdd: amountToAdd - 1, direction: 'down' };
  } else return { amountToAdd: amountToAdd + 1, direction: 'up' };
}

const shakeAnimation = {
  rotate: [0, 20, -20, 10, -10, 5, -5, 0],
  scale: [1, 1.2, 1.1, 1.4, 1],
};

const variants = {
  enter: (direction: AmountCounter['direction']) => ({
    y: direction === 'up' ? -50 : 50,
  }),
  center: { y: 0 },
  exit: (direction: AmountCounter['direction']) => ({
    y: direction === 'down' ? -50 : 50,
  }),
};

export default function ProductInfo() {
  const [{ amountToAdd, direction }, dispatch] = useReducer(reducer, {
    amountToAdd: 1,
    direction: 'up',
  });
  const [scope, animate] = useAnimate();
  return (
    <div
      className={clsx('flex flex-col gap-6 px-4 pb-12 pt-8 sm:p-0', {
        '[&_*]:outline': false,
      })}
    >
      <div className="Title">
        <p className="SneakerCompany mb-2 text-sm font-bold uppercase tracking-widest text-orange">
          Ananas
        </p>
        <motion.p
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="Name text-2xl font-bold tracking-tight xs:text-3xl sm:text-4xl"
        >
          Fall Limited Edition Sneakers
        </motion.p>
      </div>
      <p className="Description text-grey-blue-50">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer.
      </p>
      <div className="Prices flex items-center justify-between gap-1 sm:flex-col sm:items-start">
        <div className="Left flex items-center gap-4">
          <span className="ActualPrice text-xl font-bold tracking-wide xs:text-3xl">
            $125.00
          </span>
          <motion.span
            animate={{
              ...shakeAnimation,
              transition: {
                duration: 0.3,
                delay: 0.7,
              },
            }}
            className="SaleTag rounded bg-pale-orange px-2 py-1 text-sm font-bold text-orange"
          >
            50%
          </motion.span>
        </div>
        <p className="OriginalPrice text-lg font-bold text-grey-blue-75 line-through">
          $250.00
        </p>
      </div>
      <div className="Actions flex flex-col flex-wrap gap-3 xs:flex-row [&>*]:flex-grow">
        <div className="Counter relative flex min-w-fit overflow-hidden rounded-lg bg-grey-blue-93 md:max-w-40 [&>*]:flex-1">
          <button
            onClick={() => dispatch({ type: 'minus' })}
            className="grid h-12 min-w-12 place-content-center duration-75 hover:bg-black/5 active:bg-orange/25"
          >
            <img src={minusIcon} alt="" />
          </button>
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.span
              key={amountToAdd}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              custom={direction}
              className="p-3 text-center font-bold"
            >
              {amountToAdd}
            </motion.span>
          </AnimatePresence>
          <button
            onClick={() => dispatch({ type: 'plus' })}
            className="grid h-12 min-w-12 place-content-center duration-75 hover:bg-black/5 active:bg-orange/25"
          >
            <img src={plusIcon} alt="" />
          </button>
        </div>
        <button
          onMouseEnter={() => {
            animate(scope.current, shakeAnimation, { duration: 0.3 });
          }}
          className="flex min-h-12 min-w-48 items-center justify-center gap-4 rounded-xl bg-orange font-bold text-white duration-100 hover:bg-orange/80"
        >
          <svg
            ref={scope}
            width="22"
            height="20"
            className="h-[20px] w-[22px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="#fff"
              fillRule="nonzero"
            />
          </svg>
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
}
