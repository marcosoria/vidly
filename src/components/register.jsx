import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
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

  doSubmit = () => {
    console.log('submitted');
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