import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';
class Register extends Form {
  state = {
    data: {
      name: '',
      username: '',
      password: ''
    },
    errors: {}
  }

  schema = {
    name: Joi.string().required().label('Name'),
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(8).label('Password')
  }

  doSubmit = async () => {
    try{
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';

    }catch(ex){
      if(ex.response && ex.response.status === 400){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors});
      }
    }

  }

  render() { 
    return ( 
      <div className="row">
        <div className="col-6 offset-3">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('name', 'Name')}
            {this.renderInput('username', 'Username', 'email')}
            {this.renderInput('password', 'Password', 'password')}                                                            
            {this.renderButton('Register')}
          </form>
        </div>
      </div>     
    );
  }
}
 
export default Register;