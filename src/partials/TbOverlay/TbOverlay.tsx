import React, { useState, useRef } from 'react';
import { OverlayTrigger, Overlay, Button, Tooltip, Popover } from "react-bootstrap";
// import { OverlayProps } from 'react-bootstrap/Overlay';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { OverlayType } from '../../utils/enums';


interface TbOverlayModal {
    message: string,
    overlayType: OverlayType
}

function renderTooltip(props) {
    let message = props.popper.state ? props.popper.state.options.inputMessage : ""

    return (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );
}

function renderOverlay(type) {
    if (type == OverlayType.TOOLTIP) {
        return renderTooltip
    }
    return <div>Invalid</div>
}

function TbOverlay(props: TbOverlayModal) {
    return (
        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderOverlay(props.overlayType)}
            popperConfig={{ inputMessage: props.message }}
        >
            <AiOutlineInfoCircle size={20}></AiOutlineInfoCircle>
        </OverlayTrigger >
    );
}

export default TbOverlay;