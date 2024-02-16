import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

import minusIcon from './assets/images/icon-minus.svg';
import plusIcon from './assets/images/icon-plus.svg';

export default function ProductInfo() {
  const [amountToAdd, setAmountToAdd] = useState(1);
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
          <span className="ActualPrice text-3xl font-bold tracking-wide">
            $125.00
          </span>
          <span className="SaleTag rounded bg-pale-orange px-2 py-1 text-sm font-bold text-orange">
            50%
          </span>
        </div>
        <p className="OriginalPrice text-lg font-bold text-grey-blue-75 line-through">
          $250.00
        </p>
      </div>
      <div className="Actions flex flex-col flex-wrap gap-3 xs:flex-row [&>*]:flex-grow">
        <div className="Counter bg-grey-blue-93 flex min-w-fit overflow-hidden rounded-lg md:max-w-40 [&>*]:flex-1">
          <button
            onClick={() =>
              setAmountToAdd((prev) => {
                if (prev === 1) return 1;
                else return prev - 1;
              })
            }
            className="grid h-12 min-w-12 place-content-center hover:bg-black/5"
          >
            <img src={minusIcon} alt="" />
          </button>
          <span className="p-3 text-center font-bold">{amountToAdd}</span>
          <button
            onClick={() => setAmountToAdd((prev) => prev + 1)}
            className="grid h-12 min-w-12 place-content-center hover:bg-black/5"
          >
            <img src={plusIcon} alt="" />
          </button>
        </div>
        <button className="flex min-h-12 min-w-48 items-center justify-center gap-4 rounded-xl bg-orange font-bold text-white duration-100 hover:bg-orange/80">
          <svg
            width="22"
            height="20"
            className="h-[20px] w-[22px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
              fill="#fff"
              fill-rule="nonzero"
            />
          </svg>
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
}
