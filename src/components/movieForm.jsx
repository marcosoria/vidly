import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

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

  doSubmit = async () => {
    
    await saveMovie(this.state.data);
    this.props.history.push('/movies');
  }

  async populateGenres(){
    const { data: genres } = await getGenres();
    this.setState({      
      genres: genres
    });
  }

  async populateMovies(){    
    try{
      const movieId = this.props.match.params.id;
      if(movieId === 'new') return;
  
      const { data: movie } = await getMovie(movieId);      
      this.setState({data: this.mapToViewModel(movie)})
    }catch(ex){
      console.log('ex', ex);
      if(ex.response && ex.response.status === 404){
        this.props.history.replace('/not-found');
      }
    }    
  }

  async componentDidMount(){
    await this.populateGenres();
    await this.populateMovies()
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
    const { genres } = this.state;

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