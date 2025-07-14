import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { user, token, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    // Show redirect message and button for unauthenticated users
    if (!token || !user) {
        return (
            <div className="container text-center py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <i className="fas fa-lock fa-3x mb-3 text-muted"></i>
                        <h3 className="mb-3">Access Restricted</h3>
                        <p className="text-muted mb-4">
                            You need to be logged in to access this page. Please login to continue.
                        </p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/login')}
                        >
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    return children;
};

