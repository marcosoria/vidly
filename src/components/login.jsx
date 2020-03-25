import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';
class Login extends Form {
  state = {
    data: {
      username: '',
      password: ''
    },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state  ? state.from.pathname: '/';
    } catch (error) {
      if(error.response && error.response.status === 400){
        const errors = {...this.state.errors};
        errors.username = error.response.data;
        this.setState({errors});
      }
    }    
  }
  
  render() {    
    if(auth.getCurrentUser()){
      return <Redirect to="/" />
    } 
    return ( 
      <div className="row">
        <div className="col-6 offset-3">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username', 'email')}
            {this.renderInput('password', 'Password', 'password')}                                                            
            {this.renderButton('Login')}
          </form>
        </div>
      </div>      
     );
  }
}
 
export default Login;