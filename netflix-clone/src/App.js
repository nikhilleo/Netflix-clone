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
import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';


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
          <div className="select_plans">
            <Route exact path="/select_plan"> 
              <Step1/>
            </Route>
            <Route exact path="/step2"> 
              <Step2/>
            </Route>
            <Route exact path="/step3"> 
              <Step3/>
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
