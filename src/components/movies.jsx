import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import { paginate } from '../utils/paginate';
import Genres from './genres';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Movies extends Component {
  state = { 
    movies: [],
    genres: [],
    sortColumn: {
      path: 'title',
      order: 'asc'
    },
    pageSize: 4, 
    currentPage: 1,
    searchQuery: '',
    selectedGenre: null
  }

  constructor(){
    super();
    console.log('constructor called');
  }

  handleDelete = (movie) => {    
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({movies});
  }

  handleSort = (sortColumn) => {        
    this.setState({sortColumn});    
  }

  handlePageChange = (page) => {        
    this.setState({currentPage:page});
  }

  handleGenreSelect = (genre) => {    
    this.setState({selectedGenre: genre, searchQuery: '', currentPage: 1});
  }

  handleSearch = query => {    
    this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
  }

  componentDidMount(){    
    this.setState({
      movies: getMovies(),
      genres: getGenres()
    })
  }

  handleLike = (movie) => {    
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);    
    movies[index] = { ...movies[index]};
    movies[index].liked = !movies[index].liked;    
    this.setState({movies});
  }

  getPagedData = () => {
    const { currentPage, pageSize, movies: allMovies, selectedGenre, sortColumn, searchQuery} = this.state;

    // let filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    
    let filtered = allMovies;
    if(searchQuery){
      filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }else if(selectedGenre && selectedGenre._id){
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  }

  render() {
    
    const count = this.state.movies.length;
    const { currentPage, pageSize, genres, selectedGenre, sortColumn, searchQuery} = this.state;
    if(count === 0)
      return <p className="alert alert-danger">There are no movies in the database.</p> 

    const { totalCount, data: movies } = this.getPagedData(); 
    return (      
      <div className="row">
        <div className="col-3">
          <Genres 
            items={genres} 
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}>            
          </Genres>
        </div>
        <div className="col">
        <Link className="btn btn-primary m-2" to="/movies/new">New Movie</Link>
          <p>Showing <strong>{ totalCount }</strong> movies in the database</p>          
          
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          
          <MoviesTable 
            movies={movies} 
            sortColumn={sortColumn}
            onLike={this.handleLike} 
            onDelete={this.handleDelete}            
            onSort={this.handleSort}>            
          </MoviesTable>
          
          <Pagination 
            totalItems={totalCount} 
            pageSize={pageSize} 
            onPageChange={this.handlePageChange} 
            currentPage={currentPage}>            
          </Pagination>
        </div>
        
      </div>
    );
  }
}
 
export default Movies;