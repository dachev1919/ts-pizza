import React, { FC } from 'react';
import { Container } from '../../../../common/components/container/Container';
interface ProductsLoadingProps {}
export const ProductsLoading: FC<ProductsLoadingProps> = () => {
  return (
    <div className="content centring">
      <Container>
        <h2 className="content__title info">
          Завантаження інформації...&#128579;
        </h2>
      </Container>
    </div>
  );
};
