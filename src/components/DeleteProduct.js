import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

function ModalDeleteCompany(props) {
    const [id, setId] = useState(props.product.id);

    const submit = async () => {
        const load = toast.loading("");
        try {
            await axios.post("https://dashboard-api-inventory.herokuapp.com/api/product/delete", {id}, {
                headers: {
                    authorization: props.token
                }
            });

            toast.update(load, { render: "Producto eliminada", type: "success", isLoading: false });
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
                    <Modal.Title>Editar producto</Modal.Title>
                </Modal.Header>
  
                <Modal.Body>
                    <h4>¿Estas seguro de eliminar est producto?</h4>
                </Modal.Body>
        
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.closeModal(false)}>Cerrar</Button>
                    <Button onClick={submit} variant="danger" type='submit'>Eliminar</Button>
                </Modal.Footer>
            </Modal.Dialog>
      </div>
    )
}

export default ModalDeleteCompany;