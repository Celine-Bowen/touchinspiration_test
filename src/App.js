import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";

import Users from "./pages/Users";
import EditUser from "./pages/EditUser";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/edituser/:id" component={EditUser} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
