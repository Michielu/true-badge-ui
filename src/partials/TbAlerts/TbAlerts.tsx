import React from 'react';
import { Alert as Alert } from "react-bootstrap";
import { AlertProps } from 'react-bootstrap/Alert';

import { ErrorMessageInterface } from "../../utils/interfaces";

interface DisplayComponent {
    hasError: boolean,
    errorMessages: ErrorMessageInterface
}

//TODO make this more generic for other variants of alerts
function TbAlert(props: AlertProps & DisplayComponent) {
    return (
        <div>
            {props.hasError ?
                <Alert variant={props.variant}>
                    <h4>{props.errorMessages.errorMessage}</h4>
                    <p className="tb-error-p">{props.errorMessages.errorMessageLong}</p></Alert>
                : null}
        </div>
    );
}

export default TbAlert;