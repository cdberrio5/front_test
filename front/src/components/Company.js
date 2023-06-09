import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BiPencil, BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import CreateCompany from './CreateCompany';
import EditCompany from './EditCompany';
import DeleteCompany from './DeleteCompany';

function Company() {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [company, setCompany] = useState();

    const [createCompany, setCreateCompany] = useState(false);
    const [editCompany, setEditCompany] = useState(false);
    const [deleteCompany, setDeleteCompany] = useState(false);

    useEffect(() => {
        getCompanies();
    }, []);

    const getCompanies = async () => {
        const load = toast.loading("");
        try {
            const response = await axios.get('http://localhost:3003/api/company/get', {
                headers: {
                    authorization: token
                }
            });

            setCompanies(response.data.data);
            toast.update(load, { render: "Compañias cargadas", type: "success", isLoading: false });
            toast.dismiss();
            return;
        } catch (error) {
            
            if(error.response.data.error == "closeSession") {
                toast.update(load, { render: error.response.data.message, type: "error", isLoading: false });
                localStorage.removeItem("token");
                toast.dismiss();
                navigate("/auth/");
                return;
            }

            toast.update(load, { render: error.response.data, type: "error", isLoading: false });
            toast.dismiss();
            return;
        } 
    }

    return (
        <div>
            <Container className="App">
                <Row>
                    <Col>
                        <h1 style={{margin: "20px 0"}}>Compañias</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {rol == "Administrador" &&
                            <Button variant="success" onClick={() => setCreateCompany(true)}>Crear compañias</Button>
                        }

                        {companies &&
                            <div>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Telefono</th>
                                            <th>Direccion</th>
                                            <th>NIT</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companies.map(value => {
                                            return (
                                                <tr key={value._id}>
                                                    <td>{value.name}</td>
                                                    <td>{value.phone}</td>
                                                    <td>{value.address}</td>
                                                    <td>{value.NIT}</td>
                                                    
                                                    {rol == "Administrador" &&
                                                        <td className='d-flex justify-content-between'>
                                                            <Button onClick={() => { setEditCompany(true); setCompany({ 
                                                                id: value._id, 
                                                                name: value.name,
                                                                phone: value.phone,
                                                                address: value.address,
                                                                NIT: value.NIT
                                                            }) }}>
                                                                <BiPencil />
                                                            </Button>

                                                            <Button variant='danger'
                                                                onClick={() => { setDeleteCompany(true); setCompany({ 
                                                                    NIT: value.NIT
                                                                }) }}>
                                                                <BiTrashAlt />
                                                            </Button>
                                                        </td>
                                                    }
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        }

                        {!companies &&
                            <Alert key={"warning"} variant={"warning"}>
                                No hay compañias para mostrar
                            </Alert>
                        }
                    </Col>
                </Row>

            </Container>

            {createCompany &&
                <CreateCompany closeModal={setCreateCompany} token={token} loadData={getCompanies} />
            }   

            {editCompany &&
                <EditCompany company={company} closeModal={setEditCompany} token={token} loadData={getCompanies} />
            }

            {deleteCompany &&
                <DeleteCompany company={company} closeModal={setDeleteCompany} token={token} loadData={getCompanies} />
            }
        </div>
    )
}

export default Company;