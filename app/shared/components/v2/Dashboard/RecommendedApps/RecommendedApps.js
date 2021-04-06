import React from "react";
import "./RecommendedApps.global.css";

import recommendedAppsJSON from "../../../../../../resources/recommendedApps.json";
import { decentralizedData } from "../../Apps/dApps";
import Slider from "react-slick";

import "./RecommendedApps.global.css";

var trendSliderSetting = {
  dots: false,
  autoplay: false,
  autoplaySpeed: 1000,
  pauseOnHover: true,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  focusOnSelect: false,
  initialSlide: 0,
  prevArrow: false,
  nextArrow: false,
  responsive: [
    {
      breakpoint: 1630,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1520,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1330,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1220,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
  ]
};

const RecommendedApp = () => {
  return (
    <Slider {...trendSliderSetting}>
      {
        decentralizedData.map((item, index) => (
          <div className="recommended-apps-card" key={`recommeded-${index}`}>
            <a href={item.url} target="_blink">
              <img
                className={`dApps-img ${item.css}`}
                src={item.image}
              />
              <div className="app-title">{item.title}</div>
            </a>
          </div>
        ))
      }
    </Slider>
  )

}

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
        <div className="recommended-apps-body"><RecommendedApp /></div>
      </div>
    );
  }
}

export default RecommendedApps;
