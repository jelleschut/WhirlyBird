import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Card, CardBody, Collapse, ListGroup, ListGroupItem} from "reactstrap";
import WeatherImage from "./WeatherImage";


const Forecast = (props) => {

    const [forecastData, setForecastData] = useState({prediction: []});
    const [cableparkData, setCableparkData] = useState({});
    const [isOpenD0, setIsOpenD0] = useState(false);
    const [isOpenD1, setIsOpenD1] = useState(false);
    const [isOpenD2, setIsOpenD2] = useState(false);
    const [isOpenD3, setIsOpenD3] = useState(false);

    const toggleD0 = () => {
        setIsOpenD0(!isOpenD0)
    };
    const toggleD1 = () => {
        setIsOpenD1(!isOpenD1)
    };
    const toggleD2 = () => {
        setIsOpenD2(!isOpenD2)
    };
    const toggleD3 = () => {
        setIsOpenD3(!isOpenD3)
    };

    const isOpenArr = [isOpenD0, isOpenD1, isOpenD2, isOpenD3];
    const toggleArr = [toggleD0, toggleD1, toggleD2, toggleD3];

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(
                "http://127.0.0.1:8000/api/forecast/" + props.id
            );
            setForecastData({
                    prediction: [res.data['d0'],
                        res.data['d1'],
                        res.data['d2'],
                        res.data['d3']]
                }
            );
            setCableparkData(res.data.cablepark);
        }
        fetchData();
    }, [props.id]);

    return (
        <div>
            {forecastData.prediction.map((day, i) =>
                <Card key={day[0].date} className="bg-dark text-light border-primary">
                    <CardBody>
                        <ListGroup className="border-primary" horizontal>
                            <ListGroupItem className="bg-dark pointer no-border" onClick={toggleArr[i]}>
                                <div>{day[0].date}</div>
                            </ListGroupItem>
                            <ListGroupItem className="bg-dark pointer no-border ml-auto" onClick={toggleArr[i]}>
                                <div>{cableparkData['name']}</div>
                            </ListGroupItem>
                        </ListGroup>
                        <Collapse isOpen={isOpenArr[i]}>
                            <ListGroup className="collapse-group">
                                {day.map(hour =>
                                    <ListGroupItem key={hour.id} className="bg-dark no-border">
                                        {hour.time}
                                        <div className="ml-auto">
                                            {hour.wind_force}bft {hour.wind_direction} {hour.precipitation}mm {hour.temperature}°
                                        </div>
                                        <WeatherImage className="small-image" id={hour.image}/>
                                    </ListGroupItem>)}
                            </ListGroup>
                        </Collapse>

                    </CardBody>
                </Card>
            )}
        </div>
    )
};

export default Forecast