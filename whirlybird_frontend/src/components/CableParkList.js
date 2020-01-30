import React, {Component} from "react";

import CableParkListItem from "./CableParkListItem";

class CableParkList extends Component {

    render() {
        const cableparks = this.props.cableparks;
        return (
            <div>
                {!cableparks || cableparks.length <= 0 ? (
                    <b>Ops, no one here yet</b>
                ) : (
                    cableparks.map(cablepark => (
                        <CableParkListItem key={cablepark.id} cablepark={cablepark}/>
                    ))
                )}
            </div>
        );
    }
}

export default CableParkList;