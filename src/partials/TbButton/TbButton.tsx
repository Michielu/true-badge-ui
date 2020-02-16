import React from 'react';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { ButtonProps as ReactButtonProps } from 'react-bootstrap/Button';
// import {
//     Link
// } from "react-router-dom";

interface ButtonProps {
    buttons: (ReactButtonProps & ButtonValue)[]
}

interface ButtonValue {
    value: string
}

const TbButton: React.FunctionComponent<ButtonProps> = (props) => {
    return (
        <div className="row">
            {/* <div className="col-8 offset-2"> */}
            <ButtonToolbar>
                {props.buttons.map((el, i) => {
                    // TODO loop through 'el' to assign attributes
                    //  TODO using "Link" won't reload the page :/ 
                    //return (<Button key={"TbButt" + i} type={el.type} ><Link to={el.href ? el.href : "/"}></Link>{el.value}</Button>)
                    return (<Button key={"TbButt" + i} href={el.href} type={el.type} >{el.value}</Button>)
                })}
            </ButtonToolbar>
            {/* </div> */}
        </div>
    )
};
export default TbButton;