import React from "react";

// import "./RecommendedApps.global.css";

export default () => {
    return (
        <div className="recommended-apps-section">
            <div className="recommended-apps-header">
                <div className="recommended-apps-title">Recommended Apps</div>
                <img src={require('../../../../../renderer/assets/images/dashboard/Group1737.png')} />
            </div>
            <div className="recommended-apps-body">
                <div className="recommended-apps-card">
                    <img src={require('../../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
                    <div className="app-title">KARMAR</div>
                </div>
                <div className="recommended-apps-card">
                    <img src={require('../../../../../renderer/assets/images/dashboard/ScrollGroup2.png')} />
                    <div className="app-title">Newdex</div>
                </div>
                <div className="recommended-apps-card">
                    <img src={require('../../../../../renderer/assets/images/dashboard/ScrollGroup4.png')} />
                    <div className="app-title">KARMAR</div>
                </div>
                <div className="recommended-apps-card">
                    <img src={require('../../../../../renderer/assets/images/dashboard/ScrollGroup5.png')} />
                    <div className="app-title">KARMAR</div>
                </div>
                <div className="recommended-apps-card">
                    <img src={require('../../../../../renderer/assets/images/dashboard/Group209.png')} />
                    <div className="app-title">KARMAR</div>
                </div>
            </div>
        </div>
    )
}