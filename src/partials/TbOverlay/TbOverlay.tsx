import React, { useState, useRef } from 'react';
import { OverlayTrigger, Overlay, Button, Tooltip, Popover } from "react-bootstrap";
import { OverlayProps } from 'react-bootstrap/Overlay';
import { AiOutlineInfoCircle } from 'react-icons/ai';


interface TbOverlayModal {
    text1: string
}

function renderTooltip(props) {
    //where does prop get it's props
    let message = ""

    if (props.popper.state) {
        message = props.popper.state.options.inputMessage
    }

    return (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );
}

function TbOverlay(props: TbOverlayModal & OverlayProps) {
    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
            popperConfig={{ inputMessage: "wzzup" }}
        >
            <AiOutlineInfoCircle size={20}></AiOutlineInfoCircle>
            {/* <Button variant="success">{props.text}</Button> */}
        </OverlayTrigger >
    );
}

export default TbOverlay;