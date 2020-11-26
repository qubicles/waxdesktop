import React from "react";

import SideBar from "../shared/SideBar";
import Balance from "../Dashboard/Balance/Balance"

export const withSideBar = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            const containerStyle = {
                width: "100%",
                display: "flex",
                color: "white",
                backgroundColor: "#242b39"
            }

            return (
                <div style={containerStyle}>
                    <SideBar />
                    <WrappedComponent {...this.props} />
                    {
                        (this.props.location.pathname != "/marketplace") && (
                            <Balance />
                        )
                    }
                    
                </div>
            )
        }
    };
}