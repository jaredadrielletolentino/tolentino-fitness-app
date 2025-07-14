import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const HomePage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="container text-center py-5">
            <h1 className="mb-4">Welcome to Fitness Tracking App</h1>
            <p className="lead mb-5">Track your workouts and stay fit!</p>
            <div className="d-flex justify-content-center gap-3">
                {!user && (
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={() => navigate('/login')}
                    >
                        Get Started
                    </Button>
                )}
                {user && (
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={() => navigate('/workouts')}
                    >
                        View Your Workouts
                    </Button>
                )}
            </div>
        </div>
    );
};