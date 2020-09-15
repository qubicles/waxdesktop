// import React from "react";
// import {
//     Button,
//     Dropdown,
//     Form,
//     Input
//   } from "semantic-ui-react";

// export default (props) => {
//     const accountOption = [
//         {
//           text: "claim",
//           value: "claim"
//         },
//         {
//           text: "owner",
//           value: "owner"
//         }
//       ];
//     return (
//         <div className="smartActions-tab-content">
//             <div className="round-dropdown-wrap">
//                 <div className="round-dropdown-label">Contract Actions</div>
//                 <Dropdown
//                     fluid
//                     selection
//                     options={accountOption}
//                     className="round-dropdown"
//                     defaultValue="claim"
//                 />
//             </div>
//             <div className="seller-input">
//                 <div className="input-title">Action Parameters</div>
//                 <Form.Field
//                     className="ui-common-input"
//                     placeholder="owner"
//                     required
//                     autoFocus
//                     control={Input}
//                 />
//             </div>
//             <Button fluid className="delegate-btn">
//                 Load Contract
//               <img
//                     src={require("../../../../../../renderer/assets/images/advanced/correct2.png")}
//                 />
//             </Button>
//         </div>
//     )
// }

import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment } from 'semantic-ui-react';

import ContractInterfaceSelectorAction from '../Selector/Action';
import ContractInterfaceFormAction from '../Form/Action';

class ContractInterfaceTabActions extends Component<Props> {
    render() {
        const {
            actions,
            blockExplorers,
            contract,
            contractAction,
            onChange,
            onSubmit,
            settings,
            system,
            transaction
        } = this.props;
        return (
            <div className="smartActions-tab-content">
                <ContractInterfaceSelectorAction
                    contract={contract}
                    contractAction={contractAction}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
                {(contractAction)
                    ? (
                        <Segment secondary>
                            <ContractInterfaceFormAction
                                actions={actions}
                                blockExplorers={blockExplorers}
                                contract={contract}
                                contractAction={contractAction}
                                settings={settings}
                                system={system}
                                transaction={transaction}
                            />
                        </Segment>
                    ) : false
                }
            </div>
        );
    }
}

export default translate('contract')(ContractInterfaceTabActions);