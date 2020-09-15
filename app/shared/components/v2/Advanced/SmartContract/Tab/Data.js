import React from "react";
import ReactJson from 'react-json-view';

export default ({ contract }) => {
    return (
        <div>
            <ReactJson
                displayDataTypes={false}
                displayObjectSize={false}
                iconStyle="square"
                name={null}
                src={contract}
                style={{ padding: '1em' }}
                theme="harmonic"
            />
        </div>

    )
}