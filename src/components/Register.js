import React, { useEffect, useState } from 'react'
import { Col, Button, Row, Container, Image, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';

import logo from './../assets/logo.jpg';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState();

    useEffect(() => {
      const token = localStorage.getItem("token");
      
      if(token) {
        navigate("/");
      }
        
    }, [navigate]);

    const submit = async (e) => {
        e.preventDefault();        

        try {
            await axios.post("https://dashboard-api-users.herokuapp.com/api/auth/register", {email, password, name: fullName});

            toast.success("Cuenta creada");

            navigate("/auth/");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

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
                                        <Form onSubmit={submit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Nombre completo
                                                </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Nombre completo" 
                                                    onChange={e => setFullName(e.target.value)}
                                                    />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Correo electronico
                                                </Form.Label>
                                                <Form.Control 
                                                    type="email" 
                                                    placeholder="Correo electronico" 
                                                    onChange={e => setEmail(e.target.value)}
                                                    />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control 
                                                    type="password" 
                                                    placeholder="Contraseña" 
                                                    onChange={e => setPassword(e.target.value)}
                                                    />
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