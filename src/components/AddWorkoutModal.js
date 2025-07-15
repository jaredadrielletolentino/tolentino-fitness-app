import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Notyf } from 'notyf';

export default function AddWorkoutModal({ show, handleClose, fetchWorkouts }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const notyf = new Notyf();

  const addWorkout = (addWorkoutEvent) => {
    addWorkoutEvent.preventDefault();
    setIsLoading(true);

    fetch('https://fitnesstrackappapi.onrender.com/workouts/addWorkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name,
        duration
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data._id) {
        notyf.success('Workout added successfully!');
        fetchWorkouts();
        handleClose();
        setName('');
        setDuration('');
      } else {
        notyf.error('Failed to add workout');
      }
    })
    .catch(err => {
      notyf.error('An error occurred');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <Modal show={show} onHide={handleClose} centered>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="modal-title">
                🏋️‍♂️ Add New Workout
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={addWorkout}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">Workout Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={name}
                      onChange={(changeEvent) => setName(changeEvent.target.value)}
                      placeholder="Enter workout name"
                      required
                    />
                  </Form.Group>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Duration (minutes)</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={duration}
                      onChange={(changeEvent) => setDuration(changeEvent.target.value)}
                      placeholder="Enter duration in minutes"
                      required
                      min="1"
                    />
                  </Form.Group>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="d-flex gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-grow-1"
                  >
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={isLoading}
                      className="w-100"
                    >
                      {isLoading ? '⏳ Adding...' : 'Add Workout'}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="secondary" 
                      onClick={handleClose}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                </motion.div>
              </Form>
            </Modal.Body>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}