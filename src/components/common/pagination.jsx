import React  from 'react';
import PropTypes from 'prop-types'

const Pagination = (props) => {
  
  const { totalItems, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(totalItems / pageSize);
  const pages = Array.from(Array(pageCount).keys());
  
  if(pageCount === 1) return null;
  
  return ( 
    <nav aria-label="Page navigation example">
      <ul className="pagination">  
        {pages.map(p => {
          let classPageLink = "page-item";
          if(currentPage === p+1) classPageLink += ' active';
          return (
            <li key={p} className={classPageLink}>
              <button className="page-link" onClick={() => onPageChange(p+1)}>{p + 1}</button>
            </li>
          );
        })}                
      </ul>
    </nav>
   );
}

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired, 
  currentPage: PropTypes.number.isRequired
}

export default Pagination;