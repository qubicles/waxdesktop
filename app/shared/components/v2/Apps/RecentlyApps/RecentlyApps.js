import React from "react";
import "./RecentlyApps.global.css";
import { recentlyAppsData } from "../recentlyApps.js"

const recentlyApps = recentlyAppsData.map((item, index) => {
  if(index < 5){
    return (
      <div className="recommended-apps-card" key={`recommeded-${index}`}>
        <a href={item.url} target="_blink">
          <img
            src={item.image}
          />
          <div className="app-title">{item.title}</div>
        </a>
      </div>
    )
  }
});

export default () => {
  return (
    <div className="recently-apps-section">
      <div className="recommended-apps-header">
        <div className="recommended-apps-title">Popular Apps</div>
      </div>
      <div className="recommended-apps-body">{recentlyApps}</div>
    </div>
  );
};
