import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import NavBar from './components/navbar';
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import Login from './components/login';
import Register from './components/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from './services/authService';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
  state = {

  }

  componentDidMount(){
    const user = auth.getCurrentUser();
    this.setState({user});
  }

  render() {
    const { user } = this.state;
    return (
      <>
      <ToastContainer></ToastContainer>
      <NavBar user={user}></NavBar>
        <main role="main" className="container">
          <div className="starter-template">    
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/logout" component={Logout}></Route>
              <Route path="/register" component={Register}></Route>            
              <ProtectedRoute path="/movies/:id" component={MovieForm}></ProtectedRoute>            
              <Route path="/movies" render={props => 
                <Movies {...props} user={user}></Movies>
              }></Route>
              <Route path="/customers" component={Customers}></Route>
              <Route path="/rentals" component={Rentals}></Route>
              <Route path="/not-found" component={NotFound}></Route>
              <Redirect exact from ="/" to="/movies"></Redirect>
              <Redirect to="/not-found"></Redirect>
            </Switch>            
            
          </div>
        </main>
      </>
    );
  }
}

export default App;
