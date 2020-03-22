import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
const Table = ({columns, sortColumn, onSort, data}) => {
  return ( 
    <table className="table table-striped table-hover">
        <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
        <TableBody data={data} columns={columns}></TableBody>        
      </table>
   );
}
 
export default Table;