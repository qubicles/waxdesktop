import React from "react";
import "./RecommendedApps.global.css";

import recommendedAppsJSON from "../../../../../../resources/recommendedApps.json";
import { decentralizedData } from "../../Apps/dApps"

import "./RecommendedApps.global.css";
const recommendedApps = decentralizedData.map((item, index) => {
  if(index < 5){
    return (
      <div className="recommended-apps-card" key={`recommeded-${index}`}>
        <a href={item.url} target="_blink">
          <img
            className={`dApps-img ${item.css}`}
            src={item.image}
          />
          <div className="app-title">{item.title}</div>
        </a>
      </div>
    )
  }
});

class RecommendedApps extends React.Component {
  goApps = () => {
    this.props.history.push("/apps");
  };
  render() {
    return (
      <div className="recommended-apps-section">
        <div className="recommended-apps-header">
          <div className="recommended-apps-title">Recommended Apps</div>
          <img
            src={require("../../../../../renderer/assets/images/dashboard/Group1737.png")}
            onClick={this.goApps}
            className="elipsis"
          />
        </div>
        <div className="recommended-apps-body">{recommendedApps}</div>
      </div>
    );
  }
}

export default RecommendedApps;
