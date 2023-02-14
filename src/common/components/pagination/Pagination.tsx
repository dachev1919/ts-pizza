import { FC } from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { setCurrentPage } from '../../../store/slices/filterSlice';
import { RootState, useAppDispatch } from '../../../store/store';

interface PaginationProps {}

export const Pagination: FC<PaginationProps> = () => {
  const dispatch = useAppDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );

  return (
    <ReactPaginate
      pageCount={2}
      previousLabel={null}
      nextLabel={null}
      containerClassName={styles['pagination']}
      pageClassName=""
      activeClassName={styles['pagination__active']}
      pageRangeDisplayed={2}
      activeLinkClassName=""
      pageLinkClassName=""
      initialPage={currentPage - 1}
      onPageChange={({ selected }) => dispatch(setCurrentPage(++selected))}
    />
  );
};
