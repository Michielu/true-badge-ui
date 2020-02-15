import React from 'react';
import {
    Link
} from "react-router-dom";
import { Jumbotron } from 'react-bootstrap';
import TbCard from '../../partials/TbCard/TbCard';


const Home: React.FunctionComponent<{}> = () => {
    const quote: string = '"A person’s name is to him or her the sweetest and most important sound in any language." - Dale Carnegie';

    return (
        <div>
            <Jumbotron className="tb-jumbotron">
                <h1>Welcome to TrueBadge</h1>
            </Jumbotron>
            <TbCard text={quote}>
            </TbCard>
            <br />
            <button> <Link to="/create">Create Badge</Link></button>
        </div>
    )
};


export default Home;
