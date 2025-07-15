import { useContext } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserContext from '../context/UserContext';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transform Your Fitness Journey
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Track your workouts, monitor your progress, and achieve your fitness goals with our comprehensive fitness tracker
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {user.id ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    as={Link} 
                    to="/workouts" 
                    className="cta-button"
                    size="lg"
                  >
                    🏋️‍♂️ View Your Workouts
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    as={Link} 
                    to="/login" 
                    className="cta-button"
                    size="lg"
                  >
                    🚀 Get Started Today
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="feature-card p-4"
            >
              <div className="feature-icon mb-3" style={{ fontSize: '3rem' }}>
                📊
              </div>
              <h3 className="text-gradient">Track Progress</h3>
              <p className="text-muted">
                Monitor your workout progress with detailed analytics and insights
              </p>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="feature-card p-4"
            >
              <div className="feature-icon mb-3" style={{ fontSize: '3rem' }}>
                🎯
              </div>
              <h3 className="text-gradient">Set Goals</h3>
              <p className="text-muted">
                Define and achieve your fitness goals with our goal-setting tools
              </p>
            </motion.div>
          </Col>
          <Col md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="feature-card p-4"
            >
              <div className="feature-icon mb-3" style={{ fontSize: '3rem' }}>
                💪
              </div>
              <h3 className="text-gradient">Stay Motivated</h3>
              <p className="text-muted">
                Keep yourself motivated with achievements and progress tracking
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}