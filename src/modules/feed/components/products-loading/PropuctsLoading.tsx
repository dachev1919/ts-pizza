import { FC } from 'react';
import { Container } from '../../../../common/components/container/Container';
import { MiniProductSkeleton } from '../mini-product/MiniProductSkeleton';
interface ProductsLoadingProps {
  centring?: boolean;
}
export const ProductsLoading: FC<ProductsLoadingProps> = () => {
  return (
    <div className="content">
      <Container>
        <h2 className="content__title info">Завантаження піц...&#128579;</h2>
        <div className="content__items">
          {[...new Array(8)].map((_, index) => (
            <MiniProductSkeleton key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
};
