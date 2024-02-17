import { useReducer, useState } from 'react';

import galleryReducer from '../galleryReducer';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

export default function ProductPage() {
  const [{ index, direction }, dispatch] = useReducer(galleryReducer, {
    index: 0,
    direction: 1,
  });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center p-0 sm:flex-row sm:gap-8 sm:p-8 lg:gap-16 lg:p-16 [&>*]:min-w-[240px] [&>*]:flex-1">
      <ProductImages
        index={index}
        direction={direction}
        dispatch={dispatch}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <ProductInfo />
    </div>
  );
}
