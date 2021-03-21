import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUp from "./SignUp/SignUp"
import './App.css';
import HomeScreen from "../src/HomeScreen/HomeScreen";
import SignIn from './SignIn/SignIn';


function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/"> 
            <HomeScreen/>
          </Route>
          <Route exact path="/signup"> 
            <SignUp/>
          </Route>
          <Route exact path="/signin"> 
            <SignIn/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
