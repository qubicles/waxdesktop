import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, Input, Message } from "semantic-ui-react";

import "./Pin.global.css";

class CreatePin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pinDigitsCount: 6,
      pinInput_0: "",
      pinInput_1: "",
      pinInput_2: "",
      pinInput_3: "",
      pinInput_4: "",
      pinInput_5: ""
    };
  }

  onPinInput = e => {
    let { id, value } = e.target;
    value = value.slice(0, 1);

    const nextInput = id.split("_")[1];
    if (nextInput < 5 && value.length === 1)
      document.getElementById(`pinInput_${1 + +nextInput}`).focus();

    this.setState({
      [id]: value
    });
  };

  getPinInputs() {
    const pinInputs = [...Array(this.state.pinDigitsCount)].map((e, i) => {
      const pinInputId = `pinInput_${i}`;

      return (
        <Input
          type="number"
          id={pinInputId}
          onChange={this.onPinInput}
          className={`pinDigit ${this.state[pinInputId] !== "" && "is-filled"}`}
          value={this.state[pinInputId]}
        />
      );
    });

    return pinInputs;
  }

  render() {
    return (
      <div className="create-pin">
        <Form className="pin-form">{this.getPinInputs()}</Form>
        <div className="wax">WAX</div>
        <div className="desktop">DESKTOP</div>
        <div className="logo-rect1"></div>
        <div className="logo-rect2"></div>
        <div className="createYour6DigitPinToSecureYourWallet">
          <span className="createYour6DigitPinToSecureYourWallet-0">
            Create Your{" "}
          </span>
          <span className="createYour6DigitPinToSecureYourWallet-12">
            6-Digit Pin{" "}
          </span>
          <span className="createYour6DigitPinToSecureYourWallet-23">
            To Secure Your Wallet
          </span>
        </div>
        <div className="resetWallet">RESET WALLET</div>
      </div>
    );
  }
}

CreatePin.propTypes = {};

CreatePin.defaultProps = {};

export default CreatePin;
