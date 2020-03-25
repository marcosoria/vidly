import React, { Component} from 'react';
import Like from './like';
import Table from './common/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';

class MoviesTable extends Component {
  
  columns = [
    { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: 'genre.name', label: 'Genre'},
    { path: 'numberInStock', label: 'Stock'},
    { path: 'dailyRentalRate', label: 'Rate'}    
  ]

  likeColumn = {
    content: movie => <Like onLike={() => {this.props.onLike(movie)}} liked={movie.liked}></Like> 
  };

  deleteColum = { 
    content: movie => <button onClick={() => {this.props.onDelete(movie)}} type="button" className="btn btn-danger btn-sm">Delete</button> 
  };

  constructor(){
    super();
    if(auth.getCurrentUser()){
      this.columns.push(this.likeColumn);
      this.columns.push(this.deleteColum);
    }
  }

  render() { 
    const { movies, sortColumn, onSort } = this.props;
    return ( 
      <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort}></Table>
    );
  }
}

export default MoviesTable;