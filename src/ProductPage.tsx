import ProductImages from './ProductImages';
import ProductInfo from './ProductInfo';

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center p-0 sm:flex-row sm:gap-8 sm:p-8 lg:gap-16 lg:p-16 [&>*]:min-w-[240px] [&>*]:flex-1">
      <ProductImages />
      <ProductInfo />
    </div>
  );
}
