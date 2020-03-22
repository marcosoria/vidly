import React from 'react';
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


function App() {
  return (
    <>
    <NavBar></NavBar>
      <main role="main" className="container">
        <div className="starter-template">    
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>            
            <Route path="/movies/:id" component={MovieForm}></Route>            
            <Route path="/movies" component={Movies}></Route>
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

export default App;
