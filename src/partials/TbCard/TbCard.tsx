import React from 'react';

import { Card } from 'react-bootstrap';

interface CardProps {
    texts: string[]
}

const TbCard: React.FunctionComponent<CardProps> = (props) => {
    var textsToDisplay = props.texts.map((text, index) => {
        if (index === props.texts.length - 1) {
            return <div key={"card-text=" + index}>{text}</div>;
        }
        return <div key={"card-text=" + index}>{text}<hr /></div>;
    })
    return (
        <div className="row">
            <div className="col-10 offset-1">
                <Card className="tb-quote" body >
                    {textsToDisplay}</Card>
            </div>
        </div>
    )
};
export default TbCard;