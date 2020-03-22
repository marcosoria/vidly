import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).label('Number in stock'),
    dailyRentalRate: Joi.number().min(1).max(10).label('Daily Rental Rate')
  }

  doSubmit = () => {
    console.log('submitted');
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  }

  componentDidMount(){
    
    this.setState({      
      genres: getGenres()
    });

    const movieId = this.props.match.params.id;
    if(movieId === 'new') return;

    const movie = getMovie(movieId);
    if(!movie) return this.props.history.replace('/not-found');

    this.setState({data: this.mapToViewModel(movie)})
  }

  mapToViewModel(movie){
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  };

  render() { 
    
    const {genres} = this.state;

    let options = genres.map(genre => {
      return {
        value: genre._id,
        text: genre.name
      }
    });

    return ( 
      <div className="row">
        <div className="col-6 offset-3">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('title', 'Title')}
            {this.renderSelect('genreId', 'Genre', options)}
            {this.renderInput('numberInStock', 'Number in stock')}
            {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
            {this.renderButton('Save')}
          </form>
        </div>
      </div> 
    );
  }
}
 
export default MovieForm;