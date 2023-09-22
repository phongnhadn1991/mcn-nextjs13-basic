import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange, forcePage }) => {
  return (
    <ReactPaginate
      previousLabel={"< Previous"}
      nextLabel={"Next >"}
      breakLabel={"..."}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
      renderOnZeroPageCount={null}
      forcePage={forcePage}
    />
  );
};

export default Pagination;
