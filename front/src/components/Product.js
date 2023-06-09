import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BiPencil, BiTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [rol, setRol] = useState(localStorage.getItem("rol"));
    const [product, setProduct] = useState();

    const [createProduct, setCreateProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const load = toast.loading("");
        try {
            const response = await axios.get('http://localhost:3002/api/product/get', {
                headers: {
                    authorization: token
                }
            });

            setProducts(response.data.data);
            toast.update(load, { render: "Productos cargadas", type: "success", isLoading: false });
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
                        <h1 style={{margin: "20px 0"}}>Productos</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {rol == "Administrador" && 
                            <Button variant="success" onClick={() => setCreateProduct(true)}>Crear producto</Button>
                        }

                        {products &&
                            <div>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(value => {
                                            return (
                                                <tr key={value._id}>
                                                    <td>{value.name}</td>
                                                    <td>{value.quantity}</td>
                                                    <td>{value.price}</td>
                                                    {rol == "Administrador" && 
                                                        <td className='d-flex justify-content-between'>

                                                            <Button onClick={() => { setEditProduct(true); setProduct({ 
                                                                id: value._id, 
                                                                name: value.name,
                                                                quantity: value.quantity,
                                                                price: value.price,
                                                                photo: value.photo
                                                            }) }}>
                                                                <BiPencil />
                                                            </Button>

                                                            <Button variant='danger'
                                                                onClick={() => { setDeleteProduct(true); setProduct({ 
                                                                    id: value._id
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

                        {!products &&
                            <Alert key={"warning"} variant={"warning"}>
                                No hay productos para mostrar
                            </Alert>
                        }
                    </Col>
                </Row>

            </Container>

            {createProduct &&
                <CreateProduct closeModal={setCreateProduct} token={token} loadData={getProducts} />
            }   

            {editProduct &&
                <EditProduct product={product} closeModal={setEditProduct} token={token} loadData={getProducts} />
            }

            {deleteProduct &&
                <DeleteProduct product={product} closeModal={setDeleteProduct} token={token} loadData={getProducts} />
            }
        </div>
    )
}

export default Products;