import React from 'react';

import { Jumbotron } from 'react-bootstrap';

interface CardProps {
    text: string
}

const TbJumobtron: React.FunctionComponent<CardProps> = (props) => {
    return (
        <div>
            <Jumbotron className="tb-jumbotron">
                <h1>{props.text}</h1>
            </Jumbotron>
        </div>
    )
};
export default TbJumobtron;