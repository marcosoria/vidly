import React, { Component } from 'react';
import _ from 'lodash';
class TableBody extends Component {
  renderCell = (item, column) => {
    if(column.content) return column.content(item);

    return _.get(item, column.path);
  }

  render() { 
    const { data, columns } = this.props;
    return ( 
      <tbody>
        {data.map((item, i) => (
          <tr key={'tr'+i}>
            {columns.map((column, j) => (
              <td key={'td' + i + j}>{this.renderCell(item, column)}</td>
            ))}            
          </tr>
        ))}        
      </tbody> 
    );
  }
}

export default TableBody;
 
