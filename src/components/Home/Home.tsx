import React from 'react';
import {
    Link
} from "react-router-dom";
import { Card } from 'react-bootstrap';

const Home: React.FunctionComponent<{}> = () => {
    return (
        <div>


            <Card body className="tb-quote">
                <i>“A person’s name is to him or her the sweetest and most important sound in any language.”</i>
                – Dale Carnegie.
                    </Card>


            <br />
            <button> <Link to="/create">Create Badge</Link></button>

        </div>
    )
};


export default Home;
