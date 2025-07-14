import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="custom-navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-brand">
                    <i className="fas fa-dumbbell"></i>
                    Fitness Tracking App
                </Link>
                
                <div className="nav-links">
                    {user ? (
                        <button 
                            onClick={handleLogout}
                            className="btn btn-logout"
                        >
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-login">
                            <i className="fas fa-sign-in-alt"></i> Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};