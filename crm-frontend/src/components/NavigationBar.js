import React from 'react';
// import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Nav variant="tabs" defaultActiveKey={1}>
            <LinkContainer to="/">
                <Nav.Link eventKey={1}>HOME</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/account">
                <Nav.Link eventKey={2}>ACCOUNT</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
                <Nav.Link eventKey={3}>CONTACT</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/department">
                <Nav.Link eventKey={4}>DEPARTMENT</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/prospect">
                <Nav.Link eventKey={5}>PROSPECT</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/quote">
                <Nav.Link eventKey={6}>QUOTE</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/user">
                <Nav.Link eventKey={7}>USER</Nav.Link>
            </LinkContainer>
        </Nav>
    )
}

export default NavigationBar;