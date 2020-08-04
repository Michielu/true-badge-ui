import React, { useEffect } from 'react';

import { TbForm, TbJumbotron } from "../../partials";
import { GAPageView } from '../../utils/analytics';

const CreateBadge: React.FunctionComponent<{}> = () => {
    const createBadgePage: string = "Create Badge";
    const pageView = "CreateBadge";

    useEffect(() => {
        GAPageView(pageView);
    }, [])

    return (
        <div>
            <TbJumbotron text={createBadgePage}></TbJumbotron>
            <TbForm></TbForm>
        </div>
    );
}

export default CreateBadge;
