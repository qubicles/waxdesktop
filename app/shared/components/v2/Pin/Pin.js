import React from "react"
import PropTypes from "prop-types"
import { Form, Input, Button } from "semantic-ui-react"

import ResetWalletModal from "../ResetWallet/ResetWalletModal"
import showSweetAlert from "../../../utils/SweetAlert"

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
							// Go back to Create PIN when confirm pin doesn't match
							this.setState(initialState)
							this.focusFirstInput()
							showSweetAlert("error", "PINs don't match. Please try again.")
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
								this.focusFirstInput()
								this.setState(initialState)
								showSweetAlert(
									"error",
									"Incorrect PIN entered. Please try again."
								)
							}
						} else {
							// Render the confirm PIN screen
							this.setState({ confirmPinScreen: true })
							this.focusFirstInput()
						}
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
		this.focusFirstInput()
	}

	focusFirstInput() {
		document.getElementById(`pinInput_0`).focus()
	}

	toggleResetWalletModal = () => {
		const { resetWalletModal } = this.state
		this.setState({ resetWalletModal: !resetWalletModal }, () => {
			if (!this.state.resetWalletModal)
				this.focusFirstInput()
		})
	}

	render() {
		const { confirmPinScreen, resetWalletModal } = this.state
		const { wallet, actions, history, location } = this.props
		const enterPinScreen = wallet.pin !== ""

		return (
			<div className="pin">
				<div className="logo-section">
					<div className="logo-img-wrap">
						<div className="logo-rect1-wrap">
							<div className="logo-rect1"></div>
						</div>
						<div className="logo-rect2-wrap">
							<div className="logo-rect2"></div>
						</div>
					</div>
					<div className="logo-text-wrap">
						<h1 className="pin-wax">WAX</h1>
						<h4 className="pin-desktop">D E S K T O P</h4>
					</div>
				</div>
				
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
				<Form className="pin-form">{this.showPinInputs()}</Form>
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

export default Pin
