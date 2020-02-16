import React from 'react';

import { TbCard, TbJumbotron, TbButton } from "../../partials";

const Home: React.FunctionComponent<{}> = () => {
    const quote: string = '"A person’s name is to him or her the sweetest and most important sound in any language." - Dale Carnegie';
    const welcomeText: string = "Welcome to True Badge";

    const buttonProps = [{
        value: "Create Badge",
        href: "/create"
    }]
    return (
        <div >
            <TbJumbotron text={welcomeText}></TbJumbotron>
            <TbCard text={quote}>
            </TbCard>
            <br />
            <div className="tb-center">
                <TbButton buttons={buttonProps}></TbButton>
            </div>
        </div>
    )
};


export default Home;
