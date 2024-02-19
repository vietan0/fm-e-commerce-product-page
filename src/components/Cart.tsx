import { Badge } from '@nextui-org/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import clsx from 'clsx';
import { useAnimate } from 'framer-motion';
import { useContext, useEffect } from 'react';

import cartLogo from '../assets/images/icon-cart.svg';
import deleteLogo from '../assets/images/icon-delete.svg';
import { CartContext, CartItem as CartItemT } from '../CartContext';
import shakeAnimation from '../shakeAnimation';

function CartItem({ name, img, price, number }: CartItemT) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between p-3">
      <img
        src={img}
        alt=""
        width={64}
        height={64}
        className="h-14 w-14 rounded"
      />
      <div className="w-[180px] text-sm text-grey-blue-50">
        <p className="truncate">{name} + asdfasdfasd</p>
        <p>
          <span>
            ${price.toFixed(2)}
            <span> × </span>
            {number}
          </span>
          <span className="ml-3 font-bold text-grey-blue-10">
            ${(price * number).toFixed(2)}
          </span>
        </p>
      </div>
      <button
        onClick={() => removeFromCart(name)}
        className="grid h-10 w-10 flex-shrink-0 place-content-center rounded-md duration-100 hover:bg-black/5"
      >
        <img src={deleteLogo} alt="" />
      </button>
    </div>
  );
}

export default function Cart() {
  const { cartItems } = useContext(CartContext);
  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (cartItems.length > 0) {
      animate(scope.current, shakeAnimation, { duration: 0.3 });
    }
  }, [cartItems, animate, scope]);

  return (
    <Popover
      placement="bottom"
      radius="sm"
      size="lg"
      shadow="sm"
      offset={24}
      triggerScaleOnOpen={false}
      containerPadding={24}
      classNames={{
        content: clsx(
          cartItems.length === 0 && 'min-h-52',
          `w-[calc(100vw_-_48px)] xs:w-80 outline outline-1 outline-black/10 p-0 justify-start items-stretch`,
        ),
      }}
    >
      <Badge
        content={cartItems.length === 0 ? 0 : cartItems[0].number}
        size="sm"
        showOutline={false}
        isInvisible={cartItems.length === 0}
        classNames={{
          badge: 'top-[10%] right-[10%] bg-orange text-white text-[0.7rem]',
        }}
      >
        <PopoverTrigger>
          <button
            ref={scope}
            className="relative grid h-10 w-10 place-content-center rounded-full outline outline-1 outline-transparent hover:bg-black/5"
          >
            <img src={cartLogo} alt="" className="w-5" />
          </button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent>
        <p className="border-b-2 px-5 py-3 font-bold">Cart</p>
        <div className="flex flex-grow flex-col pb-3">
          {cartItems.length === 0 ? (
            <p className="m-auto font-bold text-grey-blue-50">
              Your cart is empty.
            </p>
          ) : (
            <>
              {cartItems.map((item, i) => (
                <CartItem key={i} {...item} />
              ))}
              <button className="mx-3 h-12 rounded-lg bg-orange font-bold text-white duration-100 hover:bg-orange/80">
                Checkout
              </button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
