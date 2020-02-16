import React from 'react';
import { TbCard, TbJumbotron } from '../../partials/';


const About: React.FunctionComponent<{}> = () => {
    const quote: string = "Names are a wonderful thing. A person’s name is the greatest connection to their own identity. Being able to pronounce someone’s name correctly, -- as the person themselves wants it pronounced – is a sign of courtesy, respect, and care.";
    const quote2: string = "We help you bridge the gap between face to names. We bundle your name, face, and how YOU pronounce your name onto one portable web page -- which you are given as a link -- so that you can share it with everyone.";
    const pageTitle: string = "About";

    return (
        <div>
            <TbJumbotron text={pageTitle}></TbJumbotron>
            <TbCard text={quote} />
            <TbCard text={quote2} />
        </div>
    )
};

export default About;
