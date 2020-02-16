import React from 'react';

import { Card } from 'react-bootstrap';

interface CardProps {
    text: string
}

const TbCard: React.FunctionComponent<CardProps> = (props) => {
    return (
        <div className="row">
            <div className="col-8 offset-2">
                <Card className="tb-quote" body >{props.text}</Card>
            </div>
        </div>
    )
};
export default TbCard;