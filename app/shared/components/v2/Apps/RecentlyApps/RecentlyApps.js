import React from "react";
import { translate } from 'react-i18next';

import "./RecentlyApps.global.css";
import { recentlyAppsData } from "../recentlyApps.js"

const recentlyApp = recentlyAppsData.map((item, index) => {
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

const recentlyApps = (props) => {
  const { t } = props;
  return (
    <div className="recently-apps-section">
      <div className="recommended-apps-header">
        <div className="recommended-apps-title">{t('a_popularApps')}</div>
      </div>
      <div className="recommended-apps-body">{recentlyApp}</div>
    </div>
  );
};
export default translate('apps')(recentlyApps)