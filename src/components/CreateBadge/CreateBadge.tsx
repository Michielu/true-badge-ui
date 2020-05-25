import React from 'react';

import { TbForm, TbJumbotron } from "../../partials";

const CreateBadge: React.FunctionComponent<{}> = () => {
    const createBadgePage: string = "Create Badge";

    return (
        <div>
            <TbJumbotron text={createBadgePage}></TbJumbotron>
            <TbForm></TbForm>
        </div>
    );
}

export default CreateBadge;
