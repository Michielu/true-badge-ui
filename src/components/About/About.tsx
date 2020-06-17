import React from 'react';
import { TbCard, TbJumbotron, TbCTA } from '../../partials/';

const About: React.FunctionComponent<{}> = () => {
    const personal: string = "My name, Michielu, has never been pronounced correctly without assistance. It has led to many unnecessarily uncomfortable situations."
    const personal2: string = "There are plenty of awesome names out there that could use some help in having others pronounce it correctly. Hopfully, this website can help."
    const pageTitle: string = "About";
    const buttonProps = {
        value: "Create Badge",
        href: "/create"
    };
    return (
        <div>
            <TbJumbotron text={pageTitle}></TbJumbotron>
            <TbCard texts={[personal, personal2]} />
            <div className="tb-center">
                <TbCTA buttonProps={buttonProps} />
            </div>
            <br />
        </div>
    )
};

export default About;
