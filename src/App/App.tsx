import React from 'react';

import TbNav from "../partials/TbNav/TbNav";
import Routing from '../utils/routing';


function App() {
  return (
    <div>
      <TbNav />
      <div className="app-body">
        {/* 
        <button> <Link to="/count">Test component</Link></button>
        <button> <Link to="/render00">Test Rendering</Link></button> */}
        <div>
          <Routing />
        </div>
      </div>
    </div>
  );
}

export default App;
