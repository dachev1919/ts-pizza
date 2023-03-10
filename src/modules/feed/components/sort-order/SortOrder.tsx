import { FC, memo } from 'react';
import arrowUp from '../../../../common/assets/images/arrow-up.svg';
import { setSortOrder } from '../../../../store/slices/filterSlice';
import styles from './SortOrder.module.scss';
import { useAppDispatch } from '../../../../store/store';

export enum sortOrderEnum {
  desc = 'desc',
  asc = 'asc',
}

interface SortOrderProps {}

export const SortOrder: FC<SortOrderProps> = memo(() => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.sortAscDesc}>
      <div onClick={() => dispatch(setSortOrder(sortOrderEnum.asc))}>
        <img src={arrowUp} alt="up" />
        <span>зрост.</span>
      </div>
      <div onClick={() => dispatch(setSortOrder(sortOrderEnum.desc))}>
        <img style={{ transform: 'rotate(180deg)' }} src={arrowUp} alt="down" />
        <span>спад.</span>
      </div>
    </div>
  );
});
