import { useState, useContext } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function AuthPage({ isLogin = true }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const url = isLogin 
      ? 'https://fitnesstrackappapi.onrender.com/users/login'
      : 'https://fitnesstrackappapi.onrender.com/users/register';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (isLogin) {
        if (data.access) {
          localStorage.setItem('token', data.access);
          getUserDetails(data.access);
          notyf.success('Login successful!');
          navigate('/workouts');
        } else {
          notyf.error(data.message || 'Login failed');
        }
      } else {
        if (data.message === 'Successfully Registered') {
          notyf.success('Registration successful! Please login.');
          navigate('/login');
        } else {
          notyf.error(data.message || 'Registration failed');
        }
      }
    })
    .catch(err => {
      notyf.error(`An error occurred during ${isLogin ? 'login' : 'registration'}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const getUserDetails = (token) => {
    fetch('https://fitnesstrackappapi.onrender.com/users/details', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(user => {
      setUser({
        id: user._id,
        email: user.email
      });
    });
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="auth-card shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="auth-title">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-muted">
                    {isLogin ? 'Sign in to your account' : 'Join our fitness community'}
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="auth-input"
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="auth-input"
                      required
                      minLength={isLogin ? undefined : "8"}
                    />
                  </Form.Group>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={isLoading}
                      className="w-100 auth-button"
                      size="lg"
                    >
                      {isLoading 
                        ? (isLogin ? 'Signing in...' : 'Creating account...') 
                        : (isLogin ? 'Sign In' : 'Register')
                      }
                    </Button>
                  </motion.div>
                </Form>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <a
                      href={isLogin ? "/register" : "/login"}
                      className="auth-toggle-link"
                    >
                      {isLogin ? 'Register here' : 'Login here'}
                    </a>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}