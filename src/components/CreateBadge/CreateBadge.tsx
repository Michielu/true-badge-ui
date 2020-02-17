import React from 'react';

import { TbForm } from "../../partials";

// function CreateBadge() {
//     return (
//         <div>
//             <p>Create Badge</p>

//         </div>
//     );
// }

interface Props { }

interface State {
    picture: any,
    uploadStatus: string
};

class CreateBadge extends React.Component<Props, State> {


    render() {
        return (
            <div>
                <TbForm>

                </TbForm>

            </div>
        );
    }
}

export default CreateBadge;
