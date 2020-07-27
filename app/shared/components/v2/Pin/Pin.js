import React from "react"
import PropTypes from "prop-types"
import { Form, Input } from "semantic-ui-react"

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

class Pin extends React.Component {
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

  getPinEntered = () => {
    let pin = ""
    const { pinDigitsCount } = this.state

    for (let i = 0; i < pinDigitsCount; i++) {
      const { value, confirmValue } = this.state[`pinInput_${i}`]
      pin += value
    }
    return pin
  }

  enteredCorrectPin = () => {
    const {wallet} = this.props

    if(this.getPinEntered() === wallet.pin) {
      return true
    }

    return false
  }

  onPinInput = e => {
    let { id, value } = e.target
    const { confirmPinScreen, [id]: pinInput, pinDigitsCount } = this.state
    const { actions, onUserLogin, wallet } = this.props
    const enterPinScreen = wallet.pin !== ""
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
          const allPinInputsFilled = this.checkAllPinInputsFilled()
          const confirmPinMatches = this.checkConfirmPinMatches()

          if (allPinInputsFilled) {
            // After entering pins in both the screens
            if (confirmPinMatches) {
              actions.setWalletPin(this.getPinEntered())
              onUserLogin()
            } else {
              // Go back to Create PIN if confirm pin doesn't match
              this.setState(initialState)
              document.getElementById(`pinInput_0`).focus()
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
            if (enterPinScreen) {
              if (this.enteredCorrectPin()) {
                onUserLogin()
              } else {
                // Entered incorrect pin
                this.setState(initialState)
              }
            } else {
              // Render the confirm PIN screen
              this.setState({ confirmPinScreen: true })
            }
            document.getElementById(`pinInput_0`).focus()
          }
        }
      )
    }
  }

  showPinInputs() {
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

  componentDidMount() {
    document.getElementById(`pinInput_0`).focus()
  }

  render() {
    const { confirmPinScreen } = this.state
    const { wallet } = this.props
    const enterPinScreen = wallet.pin !== ""
    return (
      <div className="pin">
        <Form className="pin-form">{this.showPinInputs()}</Form>
        <div className="wax">WAX</div>
        <div className="desktop">DESKTOP</div>
        <div className="logo-rect1"></div>
        <div className="logo-rect2"></div>
        <div className="onScreenInstruction">
          <span className="onScreenInstruction-1">
            {!enterPinScreen &&
              (confirmPinScreen ? "Confirm Your " : "Create Your ")}
          </span>
          <span className="onScreenInstruction-2">
            {enterPinScreen ? "Enter pin " : "6-Digit Pin "}
          </span>
          <span className="onScreenInstruction-3">
            {enterPinScreen
              ? "to access your wallet"
              : !confirmPinScreen && "To Secure Your Wallet"}
          </span>
        </div>
        <div className="resetWallet">RESET WALLET</div>
      </div>
    )
  }
}

Pin.propTypes = {}

Pin.defaultProps = {}

export default Pin
