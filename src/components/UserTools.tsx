import avatar from '../assets/images/image-avatar.png';
import Cart from './Cart';

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
