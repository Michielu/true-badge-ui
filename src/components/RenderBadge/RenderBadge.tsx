import React from 'react';
import {
    useParams //TODO remove this import from this file
} from "react-router-dom";

interface Props { }

interface State {
    count: number;
    id: string;
};


// class RenderBadge extends React.Component<Props, State> {
//     state: State = {
//         count: 0,
//         id: this.getParam()
//     };

//     getParam = ()=>{
//         const { id } = useParams(); //TODO check if this is the right way to do it
//         return id;
//     }

//     render() {
//         return (
//             <div>
//                 <p>Id is: {{ id }}</p>
//             </div>
//         );
//     }
// }

function RenderBadge() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();

    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
}

export default RenderBadge;