import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

export const AuthPage = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobileNo: ''
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAuthData({
            ...authData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch('https://fitnesstrackappapi.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: authData.email,
                password: authData.password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.access) {
                login(data.access);
                notyf.success('Logged in successfully');
                navigate('/workouts');
            } else {
                notyf.error(data.message || 'Invalid email or password');
            }
        })
        .catch(error => {
            notyf.error('An error occurred during login');
            console.error('Login error:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch('https://fitnesstrackappapi.onrender.com/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: authData.firstName,
                lastName: authData.lastName,
                email: authData.email,
                password: authData.password,
                mobileNo: authData.mobileNo
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === 'Registered successfully') {
                notyf.success('Registration successful. Please login.');
                setShowRegister(false);
                // Keep email, clear other fields
                setAuthData(prev => ({
                    email: prev.email,
                    password: '',
                    firstName: '',
                    lastName: '',
                    mobileNo: ''
                }));
            } else {
                notyf.error(data.message || 'Registration failed');
            }
        })
        .catch(error => {
            notyf.error('An error occurred during registration');
            console.error('Registration error:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <Card.Body>
                    <h2 className="text-center mb-4">
                        {showRegister ? 'Register' : 'Login'}
                    </h2>
                    
                    {!showRegister ? (
                        // Login Form
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={authData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={authData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="8"
                                    placeholder="Enter your password"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                            <div className="text-center">
                                <Button 
                                    variant="link" 
                                    onClick={() => setShowRegister(true)}
                                >
                                    Don't have an account? Register
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        // Register Form
                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={authData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your first name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={authData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your last name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={authData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={authData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="8"
                                    placeholder="Enter a password (min 8 characters)"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="mobileNo"
                                    value={authData.mobileNo}
                                    onChange={handleChange}
                                    required
                                    minLength="11"
                                    maxLength="11"
                                    placeholder="Enter 11-digit mobile number"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Registering...
                                    </>
                                ) : (
                                    'Register'
                                )}
                            </Button>
                            <div className="text-center">
                                <Button 
                                    variant="link" 
                                    onClick={() => setShowRegister(false)}
                                >
                                    Already have an account? Login
                                </Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};