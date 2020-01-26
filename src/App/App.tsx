import React from 'react';

import Routing from '../utils/routing';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">True Badge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/">Login/Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
