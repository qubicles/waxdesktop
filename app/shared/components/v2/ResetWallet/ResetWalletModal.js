import React from "react"
import PropTypes from "prop-types"
import { Modal, Button } from "semantic-ui-react"

import "./ResetWalletModal.global.css"

class ResetWalletModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  resetWallet = () => {
    const { actions, history, location } = this.props

    actions.setWalletPin("")

    if (location.pathname === "/") history.go()
    else history.push("/")
  }

  render() {
    const { modalOpen, closeModal } = this.props
    return (
      <Modal className="resetWalletModal" size={"tiny"} open={modalOpen}>
        <svg
          preserveAspectRatio="none"
          viewBox="2.000133514404297 1.9999980926513672 30.52099609375 30.51953125"
          className="closeIcon"
          onClick={closeModal}
        >
          <path d="M 6.471160888671875 28.04911422729492 C 0.5100620985031128 22.09127426147461 0.5100635290145874 12.42906379699707 6.469532012939453 6.469597339630127 C 12.42899703979492 0.5101315975189209 22.09120750427246 0.5101315975189209 28.0506763458252 6.469599723815918 C 34.01095962524414 12.42825317382812 34.01095199584961 22.09046173095703 28.05148696899414 28.04992866516113 C 22.09202194213867 34.0093994140625 12.42981338500977 34.0093994140625 6.470344543457031 28.04992866516113 Z M 8.622844696044922 25.89743041992188 C 13.3930721282959 30.66765594482422 21.12713432312012 30.66765594482422 25.89736175537109 25.89743041992188 C 30.66758728027344 21.12720680236816 30.66758728027344 13.393141746521 25.89736557006836 8.622915267944336 C 21.12714195251465 3.852691173553467 13.39307689666748 3.852689743041992 8.622849464416504 8.622915267944336 C 3.852622747421265 13.393141746521 3.852624416351318 21.12720680236816 8.622849464416504 25.89743423461914 Z M 19.41178894042969 17.26017189025879 L 21.57873344421387 19.41185569763184 C 22.1771183013916 20.0102424621582 22.1771183013916 20.98041534423828 21.57873344421387 21.57880020141602 C 20.9803466796875 22.17718696594238 20.01017379760742 22.17718696594238 19.41178894042969 21.57880020141602 L 17.26010322570801 19.3965950012207 L 15.10841941833496 21.56354141235352 C 14.51003265380859 22.16192626953125 13.5398588180542 22.16192626953125 12.94147491455078 21.56354141235352 C 12.34308910369873 20.96515655517578 12.34308910369873 19.99498176574707 12.94147491455078 19.3965950012207 L 15.12368011474609 17.26017189025879 L 12.9567346572876 15.10848808288574 C 12.35834980010986 14.51010322570801 12.35834980010986 13.53992938995361 12.9567346572876 12.94154262542725 C 13.55511951446533 12.34315776824951 14.52529621124268 12.34315776824951 15.12368011474609 12.94154262542725 L 17.26010322570801 15.12374877929688 L 19.41178894042969 12.95680332183838 C 20.01017379760742 12.35841846466064 20.9803466796875 12.35841846466064 21.57873344421387 12.95680332183838 C 22.1771183013916 13.55518817901611 22.1771183013916 14.52536487579346 21.57873344421387 15.12374877929688 L 19.39652824401855 17.26017189025879 Z" />
        </svg>
        <Modal.Header className="resetWallet">
          <span className="resetWallet-0">Reset </span>
          <span className="resetWallet-1">Wallet</span>
        </Modal.Header>
        <Modal.Content className="modalInstructions">
          <p className="basicInstruction">
            This will clear out all your local settings
            <br />
            and reset the entire wallet.
          </p>
          <p className="doubleConfirm">Are you sure you want to continue? </p>
        </Modal.Content>
        <Modal.Actions>
          <Button className="cancel" onClick={closeModal}>
            Cancel
          </Button>
          <Button className="reset" onClick={this.resetWallet}>
            Reset
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ResetWalletModal.propTypes = {}

ResetWalletModal.defaultProps = {}

export default ResetWalletModal
