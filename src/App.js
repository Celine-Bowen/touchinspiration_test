import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import AllUsers from "./pages/AllUsers";
import EditUser from "./pages/EditUser";

// import UserContainer from './components/UserContainer';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={AllUsers} />
            <Route exact path="/edituser/:id" component={EditUser} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
