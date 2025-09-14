import ReactPaginate from "react-paginate";

interface ReactPaginateProps {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  onPageChange: ({ selected }: { selected: number }) => void;
  forcePage: number;
  containerClassName: string;
  activeClassName: string;
  nextLabel: string;
  previousLabel: string;
}

export default function ReactPaginateComponent({
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  onPageChange,
  forcePage,
  containerClassName,
  activeClassName,
  nextLabel,
  previousLabel,
}: ReactPaginateProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onPageChange}
      forcePage={forcePage}
      containerClassName={containerClassName}
      activeClassName={activeClassName}
      nextLabel={nextLabel}
      previousLabel={previousLabel}
    />
  );
}
