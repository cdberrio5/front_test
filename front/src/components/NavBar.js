import React, { useEffect } from 'react';
import { Container, Navbar, Image, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import logo from './../assets/logo.jpg';
import user from './../assets/user.jpg'

function Menu() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if(!token) {
      navigate("/auth");
    }
      
  }, [navigate]);

  const closeSession = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className='d-flex justify-content-between align-items-center'>
          <Navbar.Brand href="#home" className='d-flex justify-content-between align-items-center'>
            <Image
              src={logo}
              width="60"
              height="60"
              className="d-inline-block align-top"
              roundedCircle 
            />
            Dashboard
          </Navbar.Brand>
          <Nav className="me-auto">
              <Nav.Link href="/">Compañias</Nav.Link>
              <Nav.Link href="/products">Productos</Nav.Link>
          </Nav>
          <NavDropdown className='d-flex justify-content-between align-items-center'
              title={
                  <Image
                      src={user}
                      width="60"
                      height="60"
                      className="d-inline-block align-top"
                      roundedCircle 
                  />
              } 
              id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={closeSession}>Cerrar sesion</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </>
  );
}
  
export default Menu;