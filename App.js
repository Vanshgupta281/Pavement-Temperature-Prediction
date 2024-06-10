import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/navnbar';
import Home from './Components/Home'; // Import your Home component
import state from './Components/state';
const App = () => {
  return (
    <>
    <Router>
      
    <Navbar/>

        <Route exact path="/" component={Home} />
        <Route exact path="/state/:stateName" component={state} />

      
    </Router></>

  );
};

export default App;
