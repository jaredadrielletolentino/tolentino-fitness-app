import { Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Notyf } from 'notyf';

export default function WorkoutCard({ workout, fetchWorkouts, onEditWorkout }) {
  const notyf = new Notyf();

  const deleteWorkout = () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      fetch(`https://fitnesstrackappapi.onrender.com/workouts/deleteWorkout/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Delete failed');
        }
      })
      .then(data => {
        if (data.message === 'Workout deleted successfully') {
          notyf.success('Workout deleted successfully!');
          fetchWorkouts();
        } else {
          notyf.error('Failed to delete workout');
        }
      })
      .catch(err => {
        console.error('Delete error:', err);
        notyf.error('An error occurred while deleting workout');
      });
    }
  };

  const completeWorkout = () => {
    fetch(`https://fitnesstrackappapi.onrender.com/workouts/completeWorkoutStatus/${workout._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Complete failed');
      }
    })
    .then(data => {
      if (data.message === 'Workout status updated successfully' || data.updatedWorkout) {
        notyf.success('Workout marked as completed!');
        fetchWorkouts();
      } else {
        notyf.error('Failed to update workout status');
      }
    })
    .catch(err => {
      console.error('Complete error:', err);
      notyf.error('An error occurred while updating workout status');
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="workout-card">
        <Card.Body>
          <Card.Title className="card-title">{workout.name}</Card.Title>
          <Card.Text className="card-text">
            <strong>Duration:</strong> {workout.duration} minutes<br />
            <strong>Status:</strong> 
            <span className={`status-badge ms-2 ${workout.status === 'completed' ? 'status-completed' : 'status-pending'}`}>
              {workout.status}
            </span><br />
            <strong>Date:</strong> {new Date(workout.dateAdded).toLocaleDateString()}
          </Card.Text>
          <div className="button-group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="btn-action btn-success" 
                onClick={completeWorkout} 
                disabled={workout.status === 'completed'}
                size="sm"
              >
                {workout.status === 'completed' ? '✓ Completed' : 'Mark Complete'}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="btn-action btn-warning" 
                onClick={() => onEditWorkout(workout)}
                size="sm"
              >
                ✏️ Edit
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="btn-action btn-danger" 
                onClick={deleteWorkout} 
                size="sm"
              >
                🗑️ Delete
              </Button>
            </motion.div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}