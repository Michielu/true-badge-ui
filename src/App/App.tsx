import React from 'react';

import TbNav from "../partials/TbNav/TbNav";
import Routing from '../utils/routing';


function App() {
  return (
    <div>
      <TbNav />
      <div className="app-body row">
        {/* 
        <button> <Link to="/count">Test component</Link></button>
        <button> <Link to="/render00">Test Rendering</Link></button> */}
        <div className="content-body col-12 col-md-8 ">
          <Routing />
        </div>
      </div>
    </div>
  );
}

export default App;
