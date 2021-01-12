import React, { Component } from "react";
import { forEach } from 'lodash';
import { Chart } from "react-google-charts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AccountActions from "../../../../../actions/accounts";
import * as SettingsActions from "../../../../../actions/settings";
const initBalData = [
    ['Date', 'Amount'],
    [1, 1],
    [2, 1]
]

class HistoryChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balData: initBalData,
            buttonColor: '',
        }
    }

    componentDidMount() {
        this.changeRange(null, 'all');
    }

    changeRange(e, range) {
        if(e) { 
            let allhistoryBtn = document.getElementsByClassName('bal-history-btn');
            for(let element in allhistoryBtn ) {
                if(allhistoryBtn[element].style) allhistoryBtn[element].style.background = 'transparent';
                if(allhistoryBtn[element].style) allhistoryBtn[element].style.border = '1px solid white';
            }
            e.target.style.backgroundColor = '#ff886d';
            e.target.style.border = 'none';
        }
        const { accounts, settings } = this.props;
        let newBalData = [
            ['Date', 'Amount'],
        ]
        let startDate = '';
        let endDate = '';
        if (accounts && settings) {
            const balTemp = accounts[settings.account].balanceHistory;
            if (balTemp) {
                switch (range) {
                    case 'day':
                        startDate = new Date().setHours(0, 0, 0, 0);
                        endDate = new Date().setHours(23, 59, 59, 999);
                        break;
                    case 'week':
                        let today = new Date(Date.now());
                        let day = today.getDay();
                        let diff = today.getDate() - day + (day == 0 ? -6 : 1);
                        startDate = new Date(today.setDate(diff)).getTime();
                        endDate = startDate + 604800000;
                        break;
                    case 'month':
                        let date = new Date();
                        startDate = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
                        endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
                        break;
                    case 'all':
                        startDate = 0
                        endDate = Date.now() + 9999999999999
                }

                balTemp.map((balList) => {
                    if (new Date(balList.timestamp).getTime() > startDate && new Date(balList.timestamp).getTime() < endDate) {
                        newBalData.push([new Date(balList.timestamp).getTime(), balList.data.amount]);
                    }
                });

                if (newBalData.length < 3) newBalData = initBalData;

                this.setState({
                    balData: newBalData,
                })
            }
        }
    }

    render() {
        const { balData } = this.state;
        return (
            <div className="chart-img">
                <Chart
                    width={200}
                    height={100}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={balData}
                    options={{
                        title: 'Balance History',
                        hAxis: {
                            title: 'Date',
                            titleTextStyle: { color: '#333' },
                            gridlines: {
                                color: 'transparent'
                            }
                        },
                        vAxis: {
                            minValue: 0,
                            gridlines: {
                                color: 'transparent'
                            }
                        },
                        // For the legend to fit, we make the chart area smaller
                        chartArea: { width: '100%', height: '100%' },
                        series: {
                            0: { color: '#ff886d' },
                        },
                        backgroundColor: 'transparent',
                        // lineWidth: 25
                    }}
                />
                <div className="chart-button-group">
                    <div className="chart-white-btn bal-history-btn" onClick={(e) => this.changeRange(e,'day')}>1D</div>
                    <div className="chart-white-btn bal-history-btn" onClick={(e) => this.changeRange(e,'week')}>1W</div>
                    <div className="chart-white-btn bal-history-btn" onClick={(e) => this.changeRange(e,'month')}>1M</div>
                    <div className="chart-orange-btn bal-history-btn" onClick={(e) => this.changeRange(e,'all')}>All</div>
                </div>
            </div>

        )
    }
}

HistoryChart.propTypes = {};

HistoryChart.defaultProps = {};

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        settings: state.settings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                ...AccountActions,
                ...SettingsActions,
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryChart)

