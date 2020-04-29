import React from 'react';

interface TbCTAProp {
    buttonProps: {
        href: string,
        value: string
    }
}

const TbCTA: React.FunctionComponent<TbCTAProp> = (props) => {
    return (
        <div className="button_cont row" >
            <a className="tb-cta" href={props.buttonProps.href}><span>{props.buttonProps.value}</span></a>
        </div>
    )
};
export default TbCTA;