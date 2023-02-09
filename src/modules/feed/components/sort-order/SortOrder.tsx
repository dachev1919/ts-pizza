import { FC } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import arrowUp from '../../../../assets/images/arrow-up.svg';
import { setSortOrder } from '../../../../store/slices/filterSlice';
import styles from './SortOrder.module.scss';

export enum sortOrderEnum {
  desc = 'desc',
  asc = 'asc',
}

interface SortOrderProps {}

export const SortOrder: FC<SortOrderProps> = () => {
  const dispatch = useDispatch();

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
};
