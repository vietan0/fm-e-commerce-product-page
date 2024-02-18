import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import { useReducer } from 'react';

import galleryReducer from '../galleryReducer';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

export default function ProductPage() {
  const [{ index, direction }, dispatch] = useReducer(galleryReducer, {
    index: 0,
    direction: 1,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col items-center p-0 sm:flex-row sm:gap-8 sm:p-8 lg:gap-16 lg:p-16 [&>*]:min-w-[240px] [&>*]:flex-1">
      <ProductImages
        index={index}
        direction={direction}
        dispatch={dispatch}
        onOpen={onOpen}
      />
      <ProductInfo />
      <Modal
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          body: 'p-6 min-h-48',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <p>Body</p>
              <button
                onClick={onClose}
                className="w-fit rounded px-6 py-2 outline outline-1 outline-orange"
              >
                Close
              </button>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
