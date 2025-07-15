import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Workouts from './pages/Workouts';
import Logout from './pages/Logout';
import UserContext from './context/UserContext';
import Loading from './components/Loading';

function App() {
  const [user, setUser] = useState({ id: null });
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser({ id: null });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://fitnesstrackappapi.onrender.com/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data._id) {
          setUser({
            id: data._id,
            email: data.email
          });
        } else {
          logout();
        }
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when done
      });
    } else {
      setIsLoading(false); // Set loading to false if no token
    }
  }, [logout]);

  // Don't render anything until auth check is complete
  if (isLoading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      <Router>
        <AppNavbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={user.id ? <Navigate to="/workouts" replace /> : <AuthPage />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/register" element={<Navigate to="/auth" replace />} />
            <Route path="/workouts" element={user.id ? <Workouts /> : <Navigate to="/auth" replace />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;