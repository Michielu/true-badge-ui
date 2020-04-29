import React from 'react';
import { TbJumbotron, TbCTA } from '../../partials/';

const About: React.FunctionComponent<{}> = () => {
    const personal: string = "My name, Michielu(pronounced Mitchel), is an English name tweaked to make it easier for my Japanese relatives to pronounce. It has never been pronounced correctly without help. "
    const personal2: string = "There are plenty of other people like me, people with ethnic or unique names, that I would like to help with this application."
    const pageTitle: string = "About";
    const buttonProps = {
        value: "Create Badge",
        href: "/create"
    };
    return (
        <div>
            <TbJumbotron text={pageTitle}></TbJumbotron>
            <div className="row">
                <div className="col-12 col-sm-4">
                    <img className="tb-width-100 tb-box-shawdow tb-margin-5" src="/me.jpg" alt="Me"></img>
                </div>
                <div className="col-12 col-sm-8 tb-text-align-left">
                    <p>{personal}</p>
                    <p>{personal2}</p>
                </div>
            </div>
            <br />
            <div className="tb-center">
                <TbCTA buttonProps={buttonProps} />
            </div>
            <br />
        </div>
    )
};

export default About;
