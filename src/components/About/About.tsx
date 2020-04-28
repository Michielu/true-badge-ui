import React from 'react';
import { TbCard, TbJumbotron, TbButton } from '../../partials/';

const About: React.FunctionComponent<{}> = () => {
    const quote: string = `"Names are a wonderful thing. A person’s name is the greatest connection to their own identity. Being able to pronounce someone’s name correctly, -- as the person themselves wants it pronounced – is a sign of courtesy, respect, and care."`;
    const quote2: string = `"We help you bridge the gap between face to names. We bundle your name, face, and how YOU pronounce your name onto one portable web page -- which you are given as a link -- so that you can share it with anyone."`;
    const pageTitle: string = "About";
    const buttonProps = [{
        value: "Create Badge",
        href: "/create"
    }]
    return (
        <div>
            <TbJumbotron text={pageTitle}></TbJumbotron>
            <TbCard texts={[quote, quote2]} />
            <br />
            <div className="tb-center">
                <TbButton buttons={buttonProps}></TbButton>
            </div>
            <br />
        </div>
    )
};

export default About;
