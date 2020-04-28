

import React from 'react';


interface TbCTAProp {
    value: string,
    onClick: any
}

const TbCTA: React.FunctionComponent<TbCTAProp> = (props) => {
    return (
        <div className="button_cont row" >
            <a className="tb-cta" href="add-website-here" target="_blank" rel="nofollow"><span>Create Badge</span></a>
        </div>
    )
};
export default TbCTA;