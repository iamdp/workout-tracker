import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Timer from "./Timer";

export default class Registration extends Component {
  state = {
    name: ""
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Start} />
          <Route
            path="/name/"
            exact
            render={props => <Name handleNameChange={this.handleNameChange} />}
          />
          <Route path="/workouts/" exact component={SelectedWorkouts} />
          <Route path="/timer/" exact component={Timer} />
        </div>
      </Router>
    );
  }
}

const Start = () => {
  return (
    <p>
      Hi there. Let's get started.{" "}
      <Link to="/name/">
        <button class="btn btn-primary">Begin</button>
      </Link>
    </p>
  );
};

const Name = props => (
  <h2>
    What can I call you? <input type="text" onChange={props.handleNameChange} />
    <Link to="/workouts">
      <button class="btn btn-primary">Next</button>
    </Link>
  </h2>
);

const SelectedWorkouts = () => {
  return (
    <div class="form-group">
      <p>What workouts would you like to track?</p>
      <div class="checkbox">
        <label>
          <input type="checkbox" value="deadhang" />
          Deadhangs
        </label>
      </div>
      <div class="checkbox">
        <label>
          <input type="checkbox" value="plank" />
          Planks
        </label>
      </div>
      <Link to="/timer/">
        <button>Submit</button>
      </Link>
    </div>
  );
};
