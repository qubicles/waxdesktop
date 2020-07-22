import React from "react"
import PropTypes from "prop-types"
import { Button, Container, Form, Input, Message } from "semantic-ui-react"

import "./Pin.global.css"

const initialState = {
  pinDigitsCount: 6,
  confirmPinScreen: false,
  pinInput_0: {
    value: "",
    confirmValue: ""
  },
  pinInput_1: {
    value: "",
    confirmValue: ""
  },
  pinInput_2: {
    value: "",
    confirmValue: ""
  },
  pinInput_3: {
    value: "",
    confirmValue: ""
  },
  pinInput_4: {
    value: "",
    confirmValue: ""
  },
  pinInput_5: {
    value: "",
    confirmValue: ""
  }
}
class CreatePin extends React.Component {
  constructor(props) {
    super(props)

    this.state = initialState
  }

  checkConfirmPinMatches = () => {
    let pinMatches = true
    let { pinDigitsCount } = this.state

    for (let i = 0; i < pinDigitsCount; i++) {
      const { value, confirmValue } = this.state[`pinInput_${i}`]

      if (value !== confirmValue) {
        pinMatches = false
        break
      }
    }

    return pinMatches
  }

  checkAllPinInputsFilled() {
    let allPinInputsFilled = true
    let { pinDigitsCount, confirmPinScreen } = this.state

    for (let i = 0; i < pinDigitsCount; i++) {
      const { value, confirmValue } = this.state[`pinInput_${i}`]

      if (
        (!confirmPinScreen && value === "") ||
        (confirmPinScreen && confirmValue === "")
      ) {
        allPinInputsFilled = false
        break
      }
    }

    return allPinInputsFilled
  }

  onPinInput = e => {
    let { id, value } = e.target
    const { confirmPinScreen, [id]: pinInput, pinDigitsCount } = this.state
    value = value.slice(0, 1)

    const currentInputId = id.split("_")[1]
    if (currentInputId < 5 && value.length === 1)
      // Propagate focus to the next pin input
      document.getElementById(`pinInput_${1 + +currentInputId}`).focus()

    if (confirmPinScreen) {
      this.setState(
        {
          [id]: { ...pinInput, confirmValue: value }
        },
        () => {
          // After entering pins in both the screens
          const allPinInputsFilled = this.checkAllPinInputsFilled()
          const confirmPinMatches = this.checkConfirmPinMatches()

          if (confirmPinScreen) {
            if (allPinInputsFilled) {
              if (confirmPinMatches) {
                // Store the data
              } else {
                // Reset to create pin if pin don't match
                this.setState(initialState)
                document.getElementById(`pinInput_0`).focus()
              }
            }
          }
        }
      )
    } else {
      this.setState(
        {
          [id]: { ...pinInput, value }
        },
        () => {
          const allPinInputsFilled = this.checkAllPinInputsFilled()

          if (allPinInputsFilled) {
            // Render the confirm PIN screen
            this.setState({ confirmPinScreen: true })
            document.getElementById(`pinInput_0`).focus()
          }
        }
      )
    }
  }

  getPinInputs() {
    const pinInputs = [...Array(this.state.pinDigitsCount)].map((e, i) => {
      const pinInputId = `pinInput_${i}`
      const {
        [pinInputId]: { value, confirmValue },
        confirmPinScreen
      } = this.state
      const pinInputIsFilled = confirmPinScreen
        ? confirmValue !== "" && "is-filled"
        : value !== "" && "is-filled"

      return (
        <Input
          key={pinInputId}
          type="number"
          id={pinInputId}
          onChange={this.onPinInput}
          className={`pin-digit  ${pinInputIsFilled}`}
          value={confirmPinScreen ? confirmValue : value}
        />
      )
    })

    return pinInputs
  }

  render() {
    const { confirmPinScreen } = this.state

    return (
      <div className="create-pin">
        <Form className="pin-form">{this.getPinInputs()}</Form>
        <div className="wax">WAX</div>
        <div className="desktop">DESKTOP</div>
        <div className="logo-rect1"></div>
        <div className="logo-rect2"></div>
        <div className="createYour6DigitPinToSecureYourWallet">
          <span className="createYour6DigitPinToSecureYourWallet-0">
            {confirmPinScreen ? "Confirm Your " : "Create Your "}
          </span>
          <span className="createYour6DigitPinToSecureYourWallet-12">
            6-Digit Pin{" "}
          </span>
          <span className="createYour6DigitPinToSecureYourWallet-23">
            {!confirmPinScreen && "To Secure Your Wallet"}
          </span>
        </div>
        <div className="resetWallet">RESET WALLET</div>
      </div>
    )
  }
}

CreatePin.propTypes = {}

CreatePin.defaultProps = {}

export default CreatePin
