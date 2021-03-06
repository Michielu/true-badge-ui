import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import ExampleBadgeURI from '../../utils/exampleBadge';

interface NavProps {
}

const TbNav: React.FunctionComponent<NavProps> = () => {
    return (
        <div className="row tb-quote">
            <Navbar sticky="top" bg="light" expand="sm" className="tb-width-100">
                <Navbar.Brand href="/">True Badge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                        <Nav.Link href="/how">How it works</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href={"b/" + ExampleBadgeURI}>Example</Nav.Link>
                        {/* <Nav.Link href="/login">Login/Register</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};
export default TbNav;