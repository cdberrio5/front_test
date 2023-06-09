import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

function ModalDeleteCompany(props) {
    const [NIT, setNIT] = useState(props.company.NIT);

    const submit = async () => {
        const load = toast.loading("");
        try {
            await axios.post("https://dashboard-api-companies.herokuapp.com/api/company/delete", {NIT}, {
                headers: {
                    authorization: props.token
                }
            });

            toast.update(load, { render: "Compañia eliminada", type: "success", isLoading: false });
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
                    <h4>¿Estas seguro de eliminar esta compañia?</h4>
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