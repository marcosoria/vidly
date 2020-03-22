import React from 'react';

const Genres = (props) => {
  
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props;
  return ( 
    <ul className="list-group">
      <li style={{ cursor: 'pointer' }} key={'all'} className={(selectedItem) ? 'list-group-item' : 'list-group-item active'} onClick={() => {onItemSelect(null)}}>All Genres</li>
      {items.map(genre => {
        return (
          <li key={genre[valueProperty]} className={(selectedItem && selectedItem._id === genre._id) ? 'list-group-item active' : 'list-group-item'} onClick={() => {onItemSelect(genre)}} style={{ cursor: 'pointer' }}>
            {genre[textProperty]}
          </li>);
      })}            
    </ul>
   );
}

Genres.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}
 
export default Genres;