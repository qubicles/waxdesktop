import React from "react";
import { translate } from 'react-i18next';

import "./DecentralizedApps.global.css";
import { decentralizedData } from "../dApps.js"

const DecentralizedAppList = (props) => {
    const { t } = props;
    return (decentralizedData.map((item, key) => (
        <div className="decentralized-apps-body" key={key}>
            <div className="dec-left-section">
                <img src={item.image} className={`dApps-img ${item.css}`} />
                <div className="dec-des">
                    <div>{item.title}</div>
                    <div>{item.description}</div>
                </div>
            </div>
            <div className="dec-right-section">
                <a className="dApps-link" href={item.url} target="_blink">{t('a_open')}</a>
            </div>
        </div>
    ))
    )
}

const DecentralizedAppLists = (props) => {
    const { t } = props;
    return (
        <div className="decentralized-apps-section">
            <div className="decentralized-apps-container">
                <div className="decentralized-apps-header">{t('a_decApps')}</div>
                <DecentralizedAppList 
                    t= {t}
                />
            </div>
        </div>
    )
}

export default translate('apps')(DecentralizedAppLists);