import React from 'react';
import { TbCard, TbJumbotron, TbCTA } from '../../partials/';

const HowItWorks: React.FunctionComponent<{}> = () => {
    const noNothing: string = "No password. No account.";
    const howItWorks: string = "After you create a badge, you'll be given a link that you can post anywhere(resume, email, website). Currently, links do not expire."
    const pageTitle: string = "How it works";
    const buttonProps = {
        value: "Create Badge",
        href: "/create"
    };
    return (
        <div>
            <TbJumbotron text={pageTitle}></TbJumbotron>
            <TbCard texts={[noNothing, howItWorks]} />
            <div className="tb-center">
                <TbCTA buttonProps={buttonProps} />
            </div>
            <br />
        </div>
    )
};

export default HowItWorks;
