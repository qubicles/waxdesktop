import React from "react";

import "./DecentralizedApps.global.css";
import { decentralizedData } from "../dApps.js"

const DecentralizedAppList = () => {

    return (decentralizedData.map(item => (
            <div className="decentralized-apps-body">
                <div className="dec-left-section">
                    <img src={item.image} className={`dApps-img ${item.css}`}/>
                    <div className="dec-des">
                        <div>{item.title}</div>
                        <div>{item.description}</div>
                    </div>
                </div>
                <div className="dec-right-section">
                    <a className="dApps-link" href={item.url} target="_blink">Open</a>
                </div>
            </div>
        ))
    )
}

export default () => {
    return (
        <div className="decentralized-apps-section">
            <div className="decentralized-apps-container">
                <div className="decentralized-apps-header">Decentralized Applications</div>
                <DecentralizedAppList />
            </div>
        </div>
    )
}