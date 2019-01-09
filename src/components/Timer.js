import React, { Component } from "react";
import styled from "styled-components";

const ButtonLayout = styled.div`
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
  }
`;

const VerticalSpacer = styled.div`
  margin: 20px auto;
`;

export default class Timer extends Component {
  state = {
    resultId: 0,
    time: 0.0,
    activity: "Deadhang",
    rep: 1,
    results: []
  };

  startTimer = () => {
    this.setState({ time: 0 }, () => {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time + 0.1 });
      }, 100);
    });
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  saveResult = () => {
    if (this.state.time === 0.0) {
      alert("Press start to begin the timer.");
    } else {
      clearInterval(this.timer);
      const { activity, rep, time } = this.state;
      this.setState({
        time: 0,
        rep: this.state.rep + 1,
        resultId: this.state.resultId + 1,
        results: [
          ...this.state.results,
          {
            activity,
            rep,
            time,
            resultId: this.state.resultId
          }
        ]
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Julia's Workout Timer</h1>
        <VerticalSpacer>
          <select
            className="form-control form-control-sm"
            onChange={e => {
              clearInterval(this.timer);
              this.setState({ activity: e.target.value, rep: 1, time: 0 });
            }}
          >
            <option disabled defaultValue>
              Select an activity.
            </option>
            <option>Deadhang</option>
            <option>Plank</option>
          </select>
        </VerticalSpacer>
        <div>Rep #{this.state.rep}</div>
        <h1>{this.state.time.toFixed(1)}</h1>
        <ButtonLayout>
          <button
            id="start"
            className="btn btn-lg btn-success"
            onClick={this.startTimer}
          >
            Start
          </button>
          <button
            id="stop"
            className="btn btn-lg btn-danger"
            onClick={this.stopTimer}
          >
            Stop
          </button>
          <button
            id="record"
            className="btn btn-lg btn-primary"
            onClick={this.saveResult}
          >
            Record
          </button>
        </ButtonLayout>
        <div>
          <ul className="list-group">
            {this.state.results.map(result => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={result.resultId}
                data-id={result.resultId}
              >
                Activity: {result.activity}, Rep: {result.rep}, Time:{" "}
                {result.time.toFixed(1)}
                <span
                  onClick={e => {
                    this.setState({
                      results: this.state.results.filter(
                        result =>
                          result.resultId !==
                          parseInt(
                            e.target.parentElement.getAttribute("data-id")
                          )
                      )
                    });
                  }}
                  className="badge badge-danger badge-pill"
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
