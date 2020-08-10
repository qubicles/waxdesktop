import React from "react"
import PropTypes from "prop-types"
import { withSnackbar } from "react-simple-snackbar"
import { Form, Input, Button } from "semantic-ui-react"

import ResetWalletModal from "../ResetWallet/ResetWalletModal"

import "./Pin.global.css"

const initialState = {
  resetWalletModal: false,
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
    const { wallet } = this.props

    if (this.getPinEntered() === wallet.pin) {
      return true
    }

    return false
  }

  onPinInput = e => {
    let { id, value } = e.target
    const { confirmPinScreen, [id]: pinInput, pinDigitsCount } = this.state
    const { actions, onUserLogin, wallet, openSnackbar } = this.props
    const enterPinScreen = wallet.pin !== ""
    value = value.slice(0, 1)

    const currentInputId = id.split("_")[1]
    if (currentInputId < 5 && value.length === 1)
      // Propagate focus to the next pin input
      this.propagateFocus(1 + +currentInputId)

    let cb = confirmPinScreen
      ? () => {
          const allPinInputsFilled = this.checkAllPinInputsFilled()
          const confirmPinMatches = this.checkConfirmPinMatches()

          if (allPinInputsFilled) {
            // After entering pins in both the screens
            if (confirmPinMatches) {
              actions.setWalletPin(this.getPinEntered())
              onUserLogin()
            } else {
              // Go back to Create PIN when confirm pin doesn't match
              this.setState(initialState)
              this.propagateFocus(0)
              openSnackbar("PINs don't match. Please try again.", 1000)
            }
          }
        }
      : () => {
          const allPinInputsFilled = this.checkAllPinInputsFilled()

          if (allPinInputsFilled) {
            if (enterPinScreen) {
              if (this.enteredCorrectPin()) {
                onUserLogin()
              } else {
                // Entered incorrect pin
                this.propagateFocus(0)
                this.setState(initialState)
                openSnackbar("Incorrect PIN entered. Please try again.", 1000)
              }
            } else {
              // Render the confirm PIN screen
              this.setState({ confirmPinScreen: true })
              this.propagateFocus(0)
            }
          }
        }

    this.updatePinInputValue(currentInputId, value, cb)
  }

  onKeyDown = ({ keyCode, target }) => {
    // Backspace and delete key
    if (keyCode === 8 || keyCode === 46) {
      const currentInputId = target.id.split("_")[1]
      const { confirmPinScreen } = this.state

      if (target.value === "" && currentInputId > 0) {
        const previousId = currentInputId - 1
        const previousIdElement = `pinInput_${previousId}`

        this.updatePinInputValue(previousId, "")
        this.propagateFocus(previousId)
      } else {
        this.updatePinInputValue(currentInputId, "")
      }
    }
  }

  updatePinInputValue = (id, value, cb) => {
    const { confirmPinScreen } = this.state
    const inputBoxId = `pinInput_${id}`

    if (confirmPinScreen) {
      this.setState(
        {
          [inputBoxId]: {
            ...this.state[inputBoxId],
            confirmValue: value
          }
        },
        cb
      )
    } else {
      this.setState(
        {
          [inputBoxId]: {
            ...this.state[inputBoxId],
            value
          }
        },
        cb
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
          onKeyDown={this.onKeyDown}
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
    this.propagateFocus(0)
  }

  propagateFocus(id) {
    document.getElementById(`pinInput_${id}`).focus()
  }

  toggleResetWalletModal = () => {
    const { resetWalletModal } = this.state
    this.setState({ resetWalletModal: !resetWalletModal }, () => {
      if (!this.state.resetWalletModal) this.propagateFocus(0)
    })
  }

  render() {
    const { confirmPinScreen, resetWalletModal } = this.state
    const { wallet, actions, history, location } = this.props
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
        {enterPinScreen && (
          <div className="resetWallet" onClick={this.toggleResetWalletModal}>
            RESET WALLET
          </div>
        )}
        <ResetWalletModal
          closeModal={this.toggleResetWalletModal}
          modalOpen={resetWalletModal}
          history={history}
          actions={actions}
          location={location}
        />
      </div>
    )
  }
}

Pin.propTypes = {}

Pin.defaultProps = {}

export default withSnackbar(Pin)
