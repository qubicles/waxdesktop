import React from "react";

import recommendedAppsJSON from "../../../../../../resources/recommendedApps.json"

// import "./RecommendedApps.global.css";

export default () => {
    const recommendedApps = recommendedAppsJSON.map((app, index) => (
        <div className="recommended-apps-card" key={`recommeded-${index}`}>
            <img src={require(`../../../../../renderer/assets/images/dashboard/${app.image}`)} />
            <div className="app-title">{app.name}</div>
        </div>
    ));

    return (
        <div className="recommended-apps-section">
            <div className="recommended-apps-header">
                <div className="recommended-apps-title">Recommended Apps</div>
                <img src={require('../../../../../renderer/assets/images/dashboard/Group1737.png')} />
            </div>
            <div className="recommended-apps-body">
                {recommendedApps}
            </div>
        </div>
    )
}