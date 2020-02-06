import React, {useEffect, useState} from 'react';
import {navigate} from 'hookrouter'
import {Collapse, CardBody, Card, ListGroup, ListGroupItem, Button} from 'reactstrap';
import axios from "axios";
import WeatherImage from "./WeatherImage";

const CableParkListItem = (props) => {
    const [summarizedData, setSummarizedData] = useState({cablepark: {}, current: {}, prediction: []});
    const [review, setReview] = useState(0);
    const [score, setScore] = useState(0);
    const [isOpenWeather, setIsOpenWeather] = useState(false);
    const [isOpenPark, setIsOpenPark] = useState(false);

    const toggleWeather = () => {
        setIsOpenWeather(!isOpenWeather);
        setIsOpenPark(false)
    };
    const togglePark = () => {
        setIsOpenPark(!isOpenPark);
        setIsOpenWeather(false)
    };

    const extendedWeather = () => {
        navigate('/forecast/' + props.id)
    };

    const handleChange = (e) => {
        setScore(e.target.value);
    };

    const handleSubmit = () => {
        axios.get(
            "http://127.0.0.1:8000/api/user",
            {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}
        ).then(() => {
            axios.post("http://127.0.0.1:8000/api/postreview", {
                    name_id: props.id,
                    score: score
                },
                {headers: {Authorization: `JWT ${localStorage.getItem('token')}`}})
        }).catch(() => {
            navigate('/login')
        })
    };

    useEffect(() => {
        async function fetchData() {
            await axios.get(
                "http://127.0.0.1:8000/api/summarized/" + props.id
            ).then(res => {
                setSummarizedData({
                    cablepark: res.data['cablepark'],
                    current: res.data['weather'],
                    prediction: [res.data['d0'],
                        res.data['d1'],
                        res.data['d2'],
                        res.data['d3']]
                })
            });
            await axios.get(
                "http://127.0.0.1:8000/api/review/" + props.id
            ).then(res => {
                setReview(res.data['score__avg'])
            })
        }

        fetchData();
    }, [score, props.id]);

    return (
        <div>
            <Card className="bg-dark text-light border-primary">
                <CardBody>
                    <ListGroup horizontal>
                        <ListGroupItem className="bg-dark pointer no-border name-location" onClick={togglePark}>
                            {summarizedData.cablepark.name}<br/>{summarizedData.cablepark.city}
                        </ListGroupItem>

                        <ListGroupItem className="bg-dark no-border ml-auto">
                            {summarizedData.current.temperature}°
                        </ListGroupItem>
                        <ListGroupItem className="bg-dark pointer no-border" onClick={toggleWeather}>
                            <WeatherImage className="small-image" id={summarizedData.current.image}/>
                        </ListGroupItem>
                    </ListGroup>
                    <Collapse isOpen={isOpenWeather}>
                        {summarizedData.prediction.map(day =>
                            <ListGroup key={day.date} horizontal className="collapse-group" onClick={extendedWeather}>
                                <ListGroupItem className="bg-dark no-border">
                                    {day.date}
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark no-border">
                                    {day.precipitation__sum.toFixed(1)}mm
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark no-border">
                                    {day.temperature__max}°
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark no-border">
                                    <WeatherImage className="small-image" id={day.image}/>
                                </ListGroupItem>
                            </ListGroup>
                        )}
                    </Collapse>

                    <Collapse isOpen={isOpenPark}>
                        <ListGroup horizontal>
                            <ListGroupItem className="bg-dark no-border">
                                <a href={summarizedData.cablepark.website}>Website</a>
                            </ListGroupItem>
                            <ListGroupItem className="bg-dark no-border">
                                Review: {review && review.toFixed(1)}
                            </ListGroupItem>
                        </ListGroup>
                        <ListGroup horizontal>
                            <ListGroupItem className="bg-dark no-border">
                                <select
                                    defaultValue="5"
                                    onChange={handleChange}
                                    className="browser-default custom-select">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </ListGroupItem>
                            <ListGroupItem className="bg-dark no-border">
                                <Button onClick={handleSubmit} className="border-primary bg-primary">Verzenden</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Collapse>
                </CardBody>
            </Card>
        </div>
    );
};

export default CableParkListItem;

