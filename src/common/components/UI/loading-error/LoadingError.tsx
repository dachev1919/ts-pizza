import { FC } from 'react';
import { Container } from '../../container/Container';
interface LoadingErrorProps {
  centring?: boolean;
}
export const LoadingError: FC<LoadingErrorProps> = ({ centring = false }) => {
  return (
    <div className={`content ${centring ? 'centring' : ''}`}>
      <Container>
        <h2 className="content__title info">
          Сталася помилка, спробуйте оновити сторінку&#128577;
        </h2>
      </Container>
    </div>
  );
};
