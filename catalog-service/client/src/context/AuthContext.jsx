import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set axios defaults when userId changes
  useEffect(() => {
    if (userId) {
      axios.defaults.headers.common['x-user-id'] = userId;
      localStorage.setItem('userId', userId);
    } else {
      delete axios.defaults.headers.common['x-user-id'];
      localStorage.removeItem('userId');
    }
  }, [userId]);

  // Load user info if userId exists
  useEffect(() => {
    const loadUser = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/auth/me');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error loading user:', err.message);
        setUserId(null);
        setUser(null);
        setIsAuthenticated(false);
        setError('Authentication error');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('http://localhost:3000/api/auth/register', formData);
      
      setUserId(res.data.user.id);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Register error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('http://localhost:3000/api/auth/login', formData);
      
      setUserId(res.data.user.id);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUserId(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 