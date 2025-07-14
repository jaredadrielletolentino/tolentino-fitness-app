import { Modal, Form, Button } from 'react-bootstrap';
import { useEffect, useRef } from 'react';

export const WorkoutForm = ({ show, handleClose, handleSubmit, formData, setFormData }) => {
    const formRef = useRef(null);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
        handleClose();
    };

    useEffect(() => {
        if (show && formRef.current) {
            formRef.current.classList.add('animate__animated', 'animate__fadeInUp');
        }
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="modal-header-animated">
                <Modal.Title>{formData._id ? 'Edit Workout' : 'Add New Workout'}</Modal.Title>
            </Modal.Header>
            <Modal.Body ref={formRef}>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3 form-group-animated">
                        <Form.Label>Workout Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input-animated"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-group-animated">
                        <Form.Label>Duration (minutes)</Form.Label>
                        <Form.Control
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            className="form-input-animated"
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button 
                            variant="secondary" 
                            onClick={handleClose} 
                            className="me-2 cancel-button"
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit"
                            className="submit-button"
                        >
                            {formData._id ? 'Update Workout' : 'Save Workout'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};