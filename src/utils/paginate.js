import _ from 'lodash';

export function paginate(items, pageNumber, pageSize){
  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedItems = _(items).slice(startIndex).take(pageSize).value();      
  return paginatedItems
}