import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Button } from 'react-bootstrap';

const logout = () => {
    sessionStorage.clear();
    window.location.reload();
}

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
            <Button variant="danger" style={{ marginLeft: "auto" }} onClick={logout}>
                Logout
            </Button>
        </Nav>
    )
}

export default NavigationBar;