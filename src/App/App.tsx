import React, { useEffect } from 'react';

import TbNav from "../partials/TbNav/TbNav";
import Routing from '../utils/routing';
import { GAinit } from '../utils/analytics';

function App() {

  useEffect(() => {
    GAinit();
  }, [])

  return (
    <div>
      <TbNav />
      <div className="app-body row">
        <div className="content-body col-12 col-md-8 ">
          <Routing />
        </div>
      </div>
    </div>
  );
}

export default App;
