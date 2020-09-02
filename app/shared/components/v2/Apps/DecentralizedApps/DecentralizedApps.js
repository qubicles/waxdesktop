import React from "react";

import "./DecentralizedApps.global.css";

const decentralizedData = [
    {
        title: 'Newdex',
        description: 'Decentralized Exchange',
        image: require('../../../../../renderer/assets/images/dashboard/ScrollGroup1.png'),
    },
    {
        title: 'KARMA',
        description: 'Social Network That Pays You',
        image: require('../../../../../renderer/assets/images/dashboard/ScrollGroup1.png'),
    },
    {
        title: 'OceanSwap',
        description: 'Instantly Swap WAX Tokens',
        image: require('../../../../../renderer/assets/images/dashboard/ScrollGroup1.png'),
    },
    {
        title: 'Topps',
        description: 'Social Network That pays You',
        image: require('../../../../../renderer/assets/images/dashboard/ScrollGroup1.png'),
    },
    {
        title: 'Tycoon',
        description: 'Build An Empire',
        image: require('../../../../../renderer/assets/images/dashboard/ScrollGroup1.png'),
    },
    
]
const DecentralizedAppList = () => {

    return (decentralizedData.map(item => (
            <div className="decentralized-apps-body">
                <div className="dec-left-section">
                    <img src={item.image} />
                    <div className="dec-des">
                        <div>{item.title}</div>
                        <div>{item.description}</div>
                    </div>
                </div>
                <div className="dec-right-section">
                    Open
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