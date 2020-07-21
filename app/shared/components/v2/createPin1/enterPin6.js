
import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, Input, Message } from 'semantic-ui-react';

import "./enterPin6.global.css";

class EnterPin6 extends React.Component {

  constructor(props) {
      super(props);
      this.state = {

      };
  }

  render() {

    return (
        <div className="enterPin6">
          <Form>
            <Input className="rectangle538"/>
            <Input disabled className="rectangle539"/>
            <Input disabled className="rectangle540"/>
            <Input disabled className="rectangle541"/>
            <Input disabled className="rectangle542"/>
            <Input disabled className="rectangle543"/>
          </Form>
          <div className="wax">WAX</div>
          <div className="desktop">DESKTOP</div>
          <div className="rectangle525"></div>
          <div className="rectangle526"></div>
          <div className="createYour6DigitPinToSecureYourWallet"><span className="createYour6DigitPinToSecureYourWallet-0">Create Your </span><span className="createYour6DigitPinToSecureYourWallet-12">6-Digit Pin</span><span className="createYour6DigitPinToSecureYourWallet-23"> To Secure Your Wallet</span></div>
          <div className="resestWallet">RESEST WALLET</div>
        </div>

    );
  }
}

EnterPin6.propTypes = {

}

EnterPin6.defaultProps = {

}


export default EnterPin6;
