import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';

import cartLogo from './assets/images/icon-cart.svg';
import avatar from './assets/images/image-avatar.png';

function Cart() {
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
        content:
          'w-[calc(100vw_-_48px)] xs:w-72 outline outline-1 outline-black/10 min-h-52 p-0 justify-start items-stretch',
      }}
    >
      <PopoverTrigger>
        <button className="relative grid h-10 w-10 place-content-center rounded-full outline outline-1 outline-transparent duration-100 hover:bg-black/5">
          <img src={cartLogo} alt="" className="w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="border-b-2 px-5 py-3 font-bold">Cart</p>
        <div className="flex flex-grow flex-col px-5 py-3">
          <p className="m-auto font-bold text-grey-blue-50">
            Your cart is empty.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function UserTools() {
  return (
    <div className="flex items-center gap-4 lg:gap-8">
      <Cart />
      <button className="grid h-10 w-10 place-content-center rounded-full outline outline-[3px] outline-transparent duration-100 hover:outline-orange">
        <img src={avatar} alt="" />
      </button>
    </div>
  );
}
