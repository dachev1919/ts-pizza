import { FC } from 'react';
import styles from './NotFound.module.scss';

interface NotFoundProps {}

export const NotFound: FC<NotFoundProps> = () => {
  return (
    <div className={styles['NotFound']}>
      <h1>
        <span>&#128533;</span>
        <br />
        Ничего не найдено
      </h1>
    </div>
  );
};
