import React, {useEffect, useState} from "react";

import CableParkListItem from "./CableParkListItem";
import axios from "axios";

const CableParkList = () => {
    const [cableparkData, setCableparkData] = useState({cableparks: []});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                "http://127.0.0.1:8000/api/cableparks"
            );

            setCableparkData(r => ({
                cableparks: result.data
            }));
        };
        fetchData();
    }, []);

    return (
        <div>
            {!cableparkData.cableparks || cableparkData.cableparks.length <= 0 ? (
                <b>No CableParks Available Right Now!</b>
            ) : (
                cableparkData.cableparks.map(park => (
                    <CableParkListItem key={park.id} id={park.id}/>
                ))
            )}
        </div>
    );
};

export default CableParkList;