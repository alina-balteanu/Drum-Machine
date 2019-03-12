import React, { Component } from "react";
import DrumItem from "./DrumItem";

class Drums extends Component {
  render() {
    let currentBank = this.props.bank;

    return (
      <div className="drum-container">
        <h1>Drum Machine</h1>
        <div className="drumbtn-container">
          {currentBank.map(el => {
            return (
              <DrumItem
                key={el.id}
                id={el.id}
                url={el.url}
                keyCode={el.keyCode}
                keyTrigger={el.keyTrigger}
                volume={this.props.volume}
                displayUpdate={this.props.displayUpdate}
                power={this.props.power}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Drums;
