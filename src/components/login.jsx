import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
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

  doSubmit = () => {
    console.log('submitted');
  }
  
  render() {     
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