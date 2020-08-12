import React from "react"
import PropTypes from "prop-types"
import { Dropdown, Modal } from "semantic-ui-react"

import "./SwapTokenModal.global.css"

const accountOption = [
	{
	  text: 'WAX',
	  value: 'WAX',
	  image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup6.png' },
	},
	{
	  text: 'KAMAR',
	  value: 'KAMAR',
	  image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup7.png' },
	},
	{
	  text: 'BET',
	  value: 'BET',
	  image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup8.png' },
	},
	{
	  text: 'GEM',
	  value: 'GEM',
	  image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup9.png' },
	},
	
]

class CryptoModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    const { modalOpen, closeModal} = this.props
    return (
        <Modal 
            onClose={closeModal}
            className="" 
            size={"tiny"} 
            open={modalOpen}
        >

            <Modal.Content className="swapTokenModal-body">
                <div className="modal-header">
                    <span>Swap </span>
                    <span> Tokens</span>
                </div>
                <div className="modal-body">
                    <div className="input-custom-select">
                        <div class="custom-input">
                            <span>Send</span>
                            <input type="text" placeholder={'0.0'} />
                        </div>
                        <Dropdown
                            scrolling
                            selection
                            options={accountOption}
                            className="swap-dropdown"
                            fluid
                            defaultValue={'WAX'}
                        />
                    </div>
                    <div className="input-custom-select">
                        <div class="custom-input">
                            <span>Receive</span>
                            <input type="text" placeholder={'0.0'} />
                        </div>
                        <Dropdown
                            scrolling
                            selection
                            options={accountOption}
                            className="swap-dropdown"
                            fluid
                            defaultValue={'WAX'}
                        />
                    </div>
                    <div className="s-right-label">
                        0.854 WAX per BNT
                    </div>
                    <div className="delegate-btn">
                        Confirm Transaction
                        <img src={require('../../../../../../renderer/assets/images/dashboard/correct3.png')} />
                    </div>
                    <div class="s-change-btn">
                        <img src={require('../../../../../../renderer/assets/images/dashboard/ScrollGroup2-1.png')} />
                    </div>
                </div>

            </Modal.Content>
        
      </Modal>
    )
  }
}

CryptoModal.propTypes = {}

CryptoModal.defaultProps = {}

export default CryptoModal