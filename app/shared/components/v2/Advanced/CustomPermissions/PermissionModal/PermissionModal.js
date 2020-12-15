import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Tab, Dropdown, Menu, Form, Input } from "semantic-ui-react"



import "./PermissionModal.css";

class PermissionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const { closeModal, modalOpen } = this.props;
        return (
            <Modal
                onClose={closeModal}
                size={"tiny"}
                open={modalOpen}
            >


                <Modal.Content
                    className="resourceModal-body"
                >
                    hello
				</Modal.Content>

            </Modal>
        )

    }
}

PermissionModal.propTypes = {};

PermissionModal.defaultProps = {};

export default PermissionModal;
