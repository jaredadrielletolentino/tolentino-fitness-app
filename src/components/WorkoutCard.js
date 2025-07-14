import { Card, Button, Badge } from 'react-bootstrap';
import { useEffect, useRef } from 'react';

export const WorkoutCard = ({ workout, onDelete, onComplete, onUpdate, animationDelay = 0 }) => {
    const cardRef = useRef(null);
    
    useEffect(() => {
        const card = cardRef.current;
        if (card) {
            card.style.animationDelay = `${animationDelay}s`;
        }
    }, [animationDelay]);

    return (
        <Card 
            ref={cardRef}
            className={`workout-card ${workout.status === 'completed' ? 'completed' : ''}`}
        >
            <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="workout-title mb-0">{workout.name}</Card.Title>
                    <Badge 
                        bg={workout.status === 'completed' ? 'success' : 'warning'}
                        className="status-badge"
                    >
                        {workout.status}
                    </Badge>
                </div>
                
                <Card.Subtitle className="text-muted mb-2">
                    Duration: {workout.duration} minutes
                </Card.Subtitle>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted">
                        {new Date(workout.dateAdded).toLocaleDateString()}
                    </small>
                </div>
                
                <div className="d-flex gap-2">
                    {workout.status !== 'completed' && (
                        <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => onComplete(workout._id)}
                        >
                            <i className="fas fa-check me-1"></i> Complete
                        </Button>
                    )}
                    <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => onUpdate(workout)}
                    >
                        <i className="fas fa-edit me-1"></i> Edit
                    </Button>
                    <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => onDelete(workout._id)}
                    >
                        <i className="fas fa-trash me-1"></i> Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};