import React, { useEffect } from 'react'
import { Col, Button, Row, Container, Image, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from './../assets/logo.jpg';


const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      
      if(token) {
        navigate("/");
      }
        
    }, [navigate]);

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4 d-flex flex-column justify-content-center align-items-center">
                                    <Image  
                                        width="100"
                                        height="100"
                                        className="d-inline-block align-top"
                                        roundedCircle  
                                        src={logo} />
                                    <h3 className="mb-5">Dashboard</h3>
                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Nombre completo
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="Nombre completo" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Correo electronico
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Correo electronico" />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control type="password" placeholder="Contraseña" />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Registrar
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                ¿Ya estas registrado?
                                                <Link to="/auth" className="text-primary fw-bold">
                                                    Inicia sesion
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;