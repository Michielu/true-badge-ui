import React from 'react';
import {
    Link
} from "react-router-dom";
import TbCard from '../../partials/TbCard/TbCard';


const Home: React.FunctionComponent<{}> = () => {
    const quote: string = '"A person’s name is to him or her the sweetest and most important sound in any language." - Dale Carnegie';

    return (
        <div>
            <TbCard text={quote}>
            </TbCard>
            <br />
            <button> <Link to="/create">Create Badge</Link></button>
        </div>
    )
};


export default Home;
