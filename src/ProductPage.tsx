import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

export default function ProductPage() {
  return (
    <div className="flex justify-between gap-8 p-4 outline sm:gap-20 sm:p-12 [&>*]:flex-grow [&>*]:basis-0">
      <ProductImages />
      <ProductInfo />
    </div>
  );
}
