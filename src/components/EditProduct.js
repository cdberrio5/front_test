import React, { useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

function ModalEditProduct(props) {
    const [quantity, setQuantity] = useState(props.product.quantity);
    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [photo, setPhoto] = useState(props.product.photo);
    const [id, setId] = useState(props.product.id);
    const [preview, setPreview] = useState(props.product.photo);

    const submit = async () => {
        const load = toast.loading("");
        try {
            await axios.post("https://dashboard-api-inventory.herokuapp.com/api/product/edit", {quantity, name, price, photo, id}, {
                headers: {
                    authorization: props.token
                }
            });

            toast.update(load, { render: "Producto editada", type: "success", isLoading: false });
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

    return (
        <div
            className="position-absolute modal show"
            style={{ display: 'block', position: 'initial', background: "rgba(0, 0, 0, 0.4)" }}
        >
            <Modal.Dialog>  
                <Modal.Header>
                    <Modal.Title>Editar Producto</Modal.Title>
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
                                value={name}
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
                                value={quantity}
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
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                />
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
                    <Button onClick={submit} variant="primary" type='submit'>Editar</Button>
                </Modal.Footer>
            </Modal.Dialog>
      </div>
    )
}

export default ModalEditProduct;