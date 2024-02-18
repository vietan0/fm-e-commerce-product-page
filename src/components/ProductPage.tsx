import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import { useReducer } from 'react';
import { useMediaQuery } from 'react-responsive';

import galleryReducer from '../galleryReducer';
import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

export default function ProductPage() {
  const [{ index, direction }, dispatch] = useReducer(galleryReducer, {
    index: 0,
    direction: 1,
  });
  const isXS = useMediaQuery({
    query: '(min-width: 400px)',
  });
  const isMD = useMediaQuery({
    query: '(min-width: 768px)',
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
      {isXS && (
        <Modal
          size={isMD ? '2xl' : 'full'}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          classNames={{
            base: ' bg-black/50 backdrop-blur-md',
            body: 'px-0 pb-4 pt-16',
            backdrop: 'bg-black/80',
            closeButton:
              'mr-2 mt-2 hover:bg-white/30 duration-100 hover:text-orange text-2xl',
          }}
        >
          <ModalContent>
            {(_onClose) => (
              <ModalBody>
                <ProductImages
                  inModal
                  index={index}
                  direction={direction}
                  dispatch={dispatch}
                  onOpen={onOpen}
                />
              </ModalBody>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
