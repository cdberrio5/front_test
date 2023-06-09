import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ModalCreateProduct(props) {
    const navigate = useNavigate();
    const [companyId, setCompanyId] = useState();
    const [quantity, setQuantity] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [photo, setPhoto] = useState();
    const [preview, setPreview] = useState();
    const [companies, setCompanies] = useState([]);

    const submit = async () => {
        const load = toast.loading("");

        try {

            const formData = new FormData();

            formData.append("image", photo);
            formData.append("quantity", quantity);
            formData.append("name", name);
            formData.append("price", price);
            formData.append("companyId", companyId);

            await axios.post("https://dashboard-api-inventory.herokuapp.com/api/product/register", formData, {
                headers: {
                    authorization: props.token
                }
            });

            toast.update(load, { render: "Producto creada", type: "success", isLoading: false });
            toast.dismiss();
            props.loadData();
            props.closeModal(false);
            return;
        } catch (error) {
            if(error.response.data.error === "closeSession") {
                toast.update(load, { render: error.response.data.message, type: "error", isLoading: false });
                localStorage.removeItem("token");
                toast.dismiss();
                return;
            }

            toast.update(load, { render: error.response.data.message, type: "error", isLoading: false });
            toast.dismiss();
            return;
        }
    }

    const getPhoto = async (e) => {
        var file = e.target.files[0];
        var url = URL.createObjectURL(file);

        setPreview(url);
        setPhoto(file);
    }

    const getCompanies = async () => {
        const load = toast.loading("");
        try {
            const response = await axios.get('https://dashboard-api-companies.herokuapp.com/api/company/get', {
                headers: {
                    authorization: props.token
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

    useEffect(() => {
        getCompanies();
    },[]);

    return (
        <div
            className="position-absolute modal show"
            style={{ display: 'block', position: 'initial', background: "rgba(0, 0, 0, 0.4)" }}
        >
            <Modal.Dialog>  
                <Modal.Header>
                    <Modal.Title>Crear Producto</Modal.Title>
                </Modal.Header>
  
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                                Nombre
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nombre" 
                                onChange={e => setName(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                                Cantidad
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Cantidad" 
                                onChange={e => setQuantity(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                                Precio
                            </Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Precio" 
                                onChange={e => setPrice(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Compañia</Form.Label>
                            <Form.Select 
                                onChange={e => setCompanyId(e.target.value)}
                            >
                                <option value="">Seleccionar compañia</option>
                                {companies.map((value) => {
                                    return <option value={value._id}>{value.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                                Imagen
                            </Form.Label>
                            <Form.Control 
                                type="file" 
                                placeholder="Imagen" 
                                onChange={e => getPhoto(e)}
                                />
                        </Form.Group>

                        <div>
                            <Image src={preview} width="320" height="320" />
                        </div>
                    </Form>
                </Modal.Body>
        
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.closeModal(false)}>Cerrar</Button>
                    <Button onClick={submit} variant="primary" type='submit'>Crear</Button>
                </Modal.Footer>
            </Modal.Dialog>
      </div>
    )
}


export default ModalCreateProduct;