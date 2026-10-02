import api from './api';

// Register new user
export const register = async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
};

// Login user
export const login = async (username, password) => {
    const response = await api.post('/api/auth/login', {
        username,
        password,
    });
    
    // Save token to localStorage
    if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Check if user is logged in
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};