import React, { Component } from "react";
import "./App.scss";

import Drums from "./components/Drums";
import { Bank1 } from "./components/Banks";
import { Bank2 } from "./components/Banks";

const activeTxtStyle = {
  color: "rgba(219, 246, 255, 1)",
  textShadow: "0 0 20px #0aafe6, 0 0 20px #0aafe600"
};
const inactiveTxtStyle = {
  color: "rgba(219, 246, 255, 0.5)",
  textShadow: "none"
};
const activeBorderStyle = {
  boxShadow: "0 0 20px #0aafe6, 0 0 20px #0aafe600",
  borderColor: "rgba(219, 246, 255, 1)"
};
const inactiveBorderStyle = {
  boxShadow: "none",
  borderColor: "rgba(219, 246, 255, 0.5)"
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      power: true,
      volume: 50,
      drum: "",
      bank: Bank1,
      display: "Waiting for a beat"
    };
  }
  getTextStyle = () => {
    return this.state.power ? activeTxtStyle : inactiveTxtStyle;
  };
  getBorderStyle = () => {
    return this.state.power ? activeBorderStyle : inactiveBorderStyle;
  };

  volumeHandler = e => {
    if (this.state.power) {
      this.setState({ volume: e.target.value });
    }
  };

  displayUpdate = displayVal => {
    this.setState({ display: displayVal });
  };

  togglePower = () => {
    this.setState({ power: !this.state.power });
    if (this.state.power) {
      this.displayUpdate("Power: Off");
    } else {
      this.displayUpdate("Power: On");
    }
  };
  toggleBank = e => {
    if (this.state.power) {
      e.target.id === "Bank1"
        ? this.setState({ bank: Bank1 })
        : this.setState({ bank: Bank2 });
    }
  };

  render() {
    return (
      <div id="drum-machine" className="App">
        <div className="dashboard-container" style={this.getTextStyle()}>
          <Drums
            volume={this.state.volume}
            displayUpdate={this.displayUpdate}
            power={this.state.power}
            bank={this.state.bank}
          />

          <div id="display" className="control-container">
            <div className="power-wrapper">
              <input
                id="power"
                type="checkbox"
                className="checkBox"
                onChange={this.togglePower}
              />
              <label className="powerLabel" htmlFor="power">
                <i className="fas fa-power-off fa-2x" />
              </label>
            </div>

            <div className="screen-wrapper" style={this.getBorderStyle()}>
              <div className="screen">{this.state.display}</div>
              <div className="volume">
                <span className="fas fa-volume-up">
                  {" " + this.state.volume}%
                </span>
              </div>
            </div>

            <div className="volume-wrapper">
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                value={this.state.volume}
                onChange={this.volumeHandler}
                style={this.getBorderStyle()}
              />
            </div>
            <div className="bank-wrapper">
              <button
                className={
                  "bank" + (this.state.bank === Bank1 ? " activeBank" : "")
                }
                id="Bank1"
                onClick={this.toggleBank}
                style={{
                  ...this.getTextStyle(),
                  ...this.getBorderStyle()
                }}
              >
                Beats
              </button>
              <button
                className={
                  "bank" + (this.state.bank === Bank2 ? " activeBank" : "")
                }
                id="Bank2"
                onClick={this.toggleBank}
                style={{ ...this.getTextStyle(), ...this.getBorderStyle() }}
              >
                Misc
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
