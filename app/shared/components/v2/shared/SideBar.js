import React from "react";

import "./SideBar.global.css";
import { Dropdown } from "semantic-ui-react";

export default () => {
    const accountOption = [
        {
            text: 'Import Account',
            value: 'Import Account',
            image: { avatar: true, src: '../assets/images/dashboard/dashboard-import.png' },
        },
        {
            text: 'Create Account',
            value: 'Create Account',
            image: { avatar: true, src: '../assets/images/dashboard/dashboard-create.png' },
        },
        {
            text: 'willquigley',
            value: 'willquigley',
            image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup6.png' },
        },
        {
            text: 'dloyt.yes',
            value: 'dloyt.yes',
            image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup6.png' },
        },
        {
            text: 'elhfo.wam',
            value: 'elhfo.wam',
            image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup6.png' },
        },
    ];
    const DropdownExampleSelection = () => (
        <Dropdown
            fluid
            selection
            scrolling
            upward
            options={accountOption}
            className="left-nav-dropdown"
            defaultValue="elhfo.wam"
        />
    );
    const menuOption = [
        {
            text: 'Home',
            value: 'home',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-home.png'),
        },
        {
            text: 'Market',
            value: 'market',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-market.png'),
        },
        {
            text: 'Apps',
            value: 'apps',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-apps.png'),
        },
        {
            text: 'Staking',
            value: 'staking',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-stacking.png'),
        },
        {
            text: 'Guilds',
            value: 'guilds',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-guilds.png'),
        },
        {
            text: 'Advanced',
            value: 'advanced',
            image: require('../../../../renderer/assets/images/dashboard/dashabord-advanced.png'),
        },
    ]

    const menuSection = (menuOption.map(item => (
        <div className="nav-item-wrap" key={item.value}>
            <img src={item.image} />
            <div className="nav-item-title">
                {item.text}
            </div>
        </div>
    )))

    return (
        <div className="nav-section">
            <div className="logo-section">
                <div className="logo-img-wrap">
                    <div className="logo-rect2-wrap">
                        <div className="logo-rect2"></div>
                    </div>
                    <div className="logo-rect1-wrap">
                        <div className="logo-rect1"></div>
                    </div>
                </div>
                <div className="logo-text-wrap">
                    <h3 className="pin-wax">WAX</h3>
                    <h4 className="pin-desktop">D E S K T O P</h4>
                </div>
            </div>

            <div className="nav-items-section">
                {menuSection}
            </div>

            <div className="nav-select-section">
                <DropdownExampleSelection />
            </div>
        </div>
    )
}