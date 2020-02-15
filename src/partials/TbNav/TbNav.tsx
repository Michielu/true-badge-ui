import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

interface NavProps {
}

const TbNav: React.FunctionComponent<NavProps> = (props) => {
    return (
        <div className="row tb-quote">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">True Badge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/">Login/Signup</Nav.Link>
                        <Nav.Link href="/count">React Practice</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};
export default TbNav;