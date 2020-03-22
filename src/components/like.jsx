import React from 'react';

const Like = (props) => {
  const { liked } = props;
    
  let likeClass = 'fa fa-heart';
  if(!liked){
    likeClass += '-o';
  }
  return (  
    <button onClick={props.onLike} type="button" className="btn btn-link m-2">
      <i style={{ color: '#FF2F92' }} className={likeClass}></i>
    </button>
  );
}
 
export default Like;