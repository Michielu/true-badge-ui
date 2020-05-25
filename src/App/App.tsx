import React from 'react';

import TbNav from "../partials/TbNav/TbNav";
import Routing from '../utils/routing';


function App() {
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
