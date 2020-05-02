import React from 'react';

import { TbCard, TbCTA, TbJumbotron } from "../../partials";

const Home: React.FunctionComponent<{}> = () => {
    const text1: string = 'Eliminate uncomfortable introductions at meetings and interviews.';
    const text2: string = "True Badge is a free, simple, platform that anyone can use to have their name pronounced the way they want it."
    const welcomeText: string = "Welcome to True Badge";

    const buttonProps = {
        value: "Create Badge",
        href: "/create"
    }
    return (
        <div >
            <TbJumbotron text={welcomeText}></TbJumbotron>
            <TbCard texts={[text1, text2]}>
            </TbCard>
            <br />
            <div className="tb-center">
                <TbCTA buttonProps={buttonProps} />
            </div>
        </div>
    )
};

export default Home;