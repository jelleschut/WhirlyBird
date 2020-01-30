import React, {useState} from 'react';
import {Collapse, CardBody, Card} from 'reactstrap';

const CableParkListItem = (props) => {
    const cablepark = props.cablepark;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Card className="bg-dark text-light border-primary" onClick={toggle}>
                <CardBody>
                    <p>{cablepark.name}</p>
                    <p>{cablepark.city}</p>
                    <Collapse isOpen={isOpen}>
                        <p>{cablepark.id}</p>
                    </Collapse>
                </CardBody>
            </Card>
        </div>
    );
};

export default CableParkListItem;

