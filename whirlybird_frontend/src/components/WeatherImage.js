import React from "react";

import Bewolkt from "../resources/weathericons/bewolkt.png"
import Bliksem from "../resources/weathericons/bliksem.png"
import Buien from "../resources/weathericons/buien.png"
import Hagel from "../resources/weathericons/hagel.png"
import Halfbewolkt from "../resources/weathericons/halfbewolkt.png"
import Helderenacht from "../resources/weathericons/helderenacht.png"
import Mist from "../resources/weathericons/mist.png"
import Nachtmist from "../resources/weathericons/nachtmist.png"
import Regen from "../resources/weathericons/regen.png"
import Sneeuw from "../resources/weathericons/sneeuw.png"
import Wolkennacht from "../resources/weathericons/wolkennacht.png"
import Zonnig from "../resources/weathericons/zonnig.png"
import Zwaarbewolkt from "../resources/weathericons/zwaarbewolkt.png"

const WeatherImage = (props) => {
    switch (props.id) {
        case "bewolkt":
            return <img className="small-image" src={Bewolkt} alt="bewolkt"/>;
        case "bliksem":
            return <img className="small-image" src={Bliksem} alt="bliksem"/>;
        case "buien":
            return <img className="small-image" src={Buien} alt="buien"/>;
        case "hagel":
            return <img className="small-image" src={Hagel} alt="hagel"/>;
        case "halfbewolkt":
        case "lichtbewolkt":
            return <img className="small-image" src={Halfbewolkt} alt="halfbewolkt"/>;
        case "helderenacht":
            return <img className="small-image" src={Helderenacht} alt="helderenacht"/>;
        case "mist":
            return <img className="small-image" src={Mist} alt="mist"/>;
        case "nachtmist":
            return <img className="small-image" src={Nachtmist} alt="nachtmist"/>;
        case "regen":
            return <img className="small-image" src={Regen} alt="regen"/>;
        case "sneeuw":
            return <img className="small-image" src={Sneeuw} alt="sneeuw"/>;
        case "nachtbewolkt":
            return <img className="small-image" src={Wolkennacht} alt="wolkennacht"/>;
        case "zonnig":
            return <img className="small-image" src={Zonnig} alt="zonning"/>;
        case "zwaarbewolkt":
            return <img className="small-image" src={Zwaarbewolkt} alt="zwaarbewolkt"/>;
        default:
            return <p>"???"</p>;
    }
};

export default WeatherImage;