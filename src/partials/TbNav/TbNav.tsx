import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

interface NavProps {
}

const TbNav: React.FunctionComponent<NavProps> = () => {
    return (
        <div className="row tb-quote">
            <Navbar sticky="top" bg="light" expand="sm" className="tb-width-100">
                <Navbar.Brand href="/">True Badge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};
export default TbNav;