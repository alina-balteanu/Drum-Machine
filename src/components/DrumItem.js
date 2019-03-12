import React, { Component } from "react";

const activeBtn = {
  color: "rgba(219, 246, 255, 1)",
  transform: "scale(0.9)",
  boxShadow:
    "1px 1px 10px 3px rgba(219, 246, 255, 1),-1px -1px 10px 3px rgba(219, 246, 255, 1)"
};
const inactiveBtn = {
  color: "rgba(219, 246, 255, 0)",
  transform: "scale(1)",
  boxShadow: "none"
};

class DrumItem extends Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playSound = this.playSound.bind(this);

    this.state = {
      active: false
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  };

  playSound = () => {
    if (this.props.power) {
      const sound = document.getElementById(this.props.keyTrigger);
      sound.currentTime = 0;
      sound.volume = this.props.volume / 100;
      sound.play();
      this.props.displayUpdate(this.props.id);

      this.setState({ active: !this.state.active });
      setTimeout(() => {
        this.setState({ active: !this.state.active });
      }, 200);
    }
  };
  getBtnStyle = () => {
    return this.state.active ? activeBtn : inactiveBtn;
  };

  render() {
    return (
      <div
        className="drum-pad btn"
        onClick={this.playSound}
        style={this.getBtnStyle()}
      >
        <span>{this.props.keyTrigger}</span>
        <audio
          src={this.props.url}
          className="clip"
          id={this.props.keyTrigger}
        />
      </div>
    );
  }
}

export default DrumItem;
