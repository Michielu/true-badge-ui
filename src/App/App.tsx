import React from 'react';
import {
  Link
} from "react-router-dom";

import Routing from '../utils/routing';

function App() {
  return (
    <div className="app-body">
      <button><Link to="/">Home</Link></button>
      <button> <Link to="/about">About</Link></button>
      <button> <Link to="/create">Create Badge</Link></button>
      <button> <Link to="/count">Test component</Link></button>
      <button> <Link to="/render00">Test Rendering</Link></button>

      <div>
        <Routing />
      </div>
    </div>
  );
}

export default App;
