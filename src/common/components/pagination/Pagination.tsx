import { Dispatch, FC, SetStateAction } from 'react';
// @ts-ignore
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination: FC<PaginationProps> = ({ setCurrentPage }) => {
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
      onPageChange={({ selected }) => setCurrentPage(++selected)}
    />
  );
};
