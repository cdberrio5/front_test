import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

function ModalEditCompany(props) {
    const [NIT, setNIT] = useState(props.company.NIT);
    const [address, setAddress] = useState(props.company.address);
    const [name, setName] = useState(props.company.name);
    const [phone, setPhone] = useState(props.company.phone);

    const submit = async () => {
        const load = toast.loading("");
        try {
            await axios.post("https://dashboard-api-companies.herokuapp.com/api/company/edit", {name, address, phone, NIT}, {
                headers: {
                    authorization: props.token
                }
            });

            toast.update(load, { render: "Compañia editada", type: "success", isLoading: false });
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

    return (
        <div
            className="position-absolute modal show"
            style={{ display: 'block', position: 'initial', background: "rgba(0, 0, 0, 0.4)" }}
        >
            <Modal.Dialog>  
                <Modal.Header>
                    <Modal.Title>Editar compañia</Modal.Title>
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
                                value={name}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                                Direccion
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Direccion" 
                                onChange={e => setAddress(e.target.value)}
                                value={address}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                                Telefono
                            </Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Telefono" 
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                                />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>NIT</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="NIT" 
                                onChange={e => setNIT(e.target.value)}
                                value={NIT}
                                disabled
                                />
                        </Form.Group>
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

export default ModalEditCompany;