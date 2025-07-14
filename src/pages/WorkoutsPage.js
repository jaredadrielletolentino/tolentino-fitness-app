import { useState, useEffect, useContext, useCallback } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { WorkoutCard } from '../components/WorkoutCard';
import { WorkoutForm } from '../components/WorkoutForm';
import { AuthContext } from '../context/AuthContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

export const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        duration: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useContext(AuthContext);

    const fetchWorkouts = useCallback(() => {
        if (!token) return;
        
        setIsLoading(true);
        fetch('https://fitnesstrackappapi.onrender.com/workouts/getMyWorkouts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.workouts) {
                setWorkouts(data.workouts);
            }
        })
        .catch(error => {
            console.error('Error fetching workouts:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [token]);

    useEffect(() => {
        fetchWorkouts();
    }, [fetchWorkouts]);

    const handleSubmitWorkout = (workoutData) => {
        if (workoutData._id) {
            handleUpdateWorkout(workoutData);
        } else {
            handleAddWorkout(workoutData);
        }
    };

    const handleAddWorkout = (workoutData) => {
        fetch('https://fitnesstrackappapi.onrender.com/workouts/addWorkout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workoutData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.name) {
                notyf.success('Workout added successfully');
                fetchWorkouts();
                setFormData({ name: '', duration: '' });
            } else {
                notyf.error('Failed to add workout');
            }
        })
        .catch(error => {
            notyf.error('Error adding workout');
            console.error('Add workout error:', error);
        });
    };

    const handleUpdateWorkout = (workoutData) => {
        fetch(`https://fitnesstrackappapi.onrender.com/workouts/updateWorkout/${workoutData._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: workoutData.name,
                duration: workoutData.duration
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'workout updated successfully') {
                notyf.success('Workout updated successfully');
                fetchWorkouts();
                setFormData({ name: '', duration: '' });
            } else {
                notyf.error('Failed to update workout');
            }
        })
        .catch(error => {
            notyf.error('Error updating workout');
            console.error('Update workout error:', error);
        });
    };

    const handleDeleteWorkout = (workoutId) => {
        fetch(`https://fitnesstrackappapi.onrender.com/workouts/deleteWorkout/${workoutId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Workout deleted successfully') {
                notyf.success('Workout deleted successfully');
                fetchWorkouts();
            } else {
                notyf.error('Failed to delete workout');
            }
        })
        .catch(error => {
            notyf.error('Error deleting workout');
            console.error('Delete workout error:', error);
        });
    };

    const handleCompleteWorkout = (workoutId) => {
        fetch(`https://fitnesstrackappapi.onrender.com/workouts/completeWorkoutStatus/${workoutId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'workout status updated successfully') {
                notyf.success('Workout marked as completed!');
                fetchWorkouts();
            } else {
                notyf.error('Failed to update workout status');
            }
        })
        .catch(error => {
            notyf.error('Error updating workout status');
            console.error('Complete workout error:', error);
        });
    };

    return (
        <div className="container">
            <div className="workouts-header">
                <h2>My Workouts</h2>
                <Button 
                    variant="primary" 
                    onClick={() => {
                        setFormData({ name: '', duration: '' });
                        setShowForm(true);
                    }}
                >
                    <i className="fas fa-plus me-2"></i> Add Workout
                </Button>
            </div>
            
            {isLoading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : workouts.length > 0 ? (
                <div className="workouts-list">
                    {workouts.map((workout, index) => (
                        <WorkoutCard
                            key={workout._id}
                            workout={workout}
                            onDelete={handleDeleteWorkout}
                            onComplete={handleCompleteWorkout}
                            onUpdate={(workout) => {
                                setFormData({
                                    _id: workout._id,
                                    name: workout.name,
                                    duration: workout.duration
                                });
                                setShowForm(true);
                            }}
                            animationDelay={index * 0.1}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <i className="fas fa-dumbbell fa-3x mb-3 text-muted"></i>
                    <p className="h5">No workouts found</p>
                    <p className="text-muted mb-4">Add your first workout to get started!</p>
                    <Button 
                        variant="primary"
                        onClick={() => {
                            setFormData({ name: '', duration: '' });
                            setShowForm(true);
                        }}
                    >
                        Add Workout
                    </Button>
                </div>
            )}
            
            <WorkoutForm
                show={showForm}
                handleClose={() => {
                    setShowForm(false);
                    setFormData({ name: '', duration: '' });
                }}
                handleSubmit={handleSubmitWorkout}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
};