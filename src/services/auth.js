import api from './api';

// Register new user
export const register = async (userData) => {
    try {
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    } catch (err) {
        console.warn('Backend unavailable, using frontend demo mode for registration.');
        const mockUser = {
            id: Date.now(),
            username: userData.username || 'newuser',
            full_name: userData.full_name || 'New User',
            email: userData.email || 'user@kmrl.co.in',
            role: userData.role || 'Officer',
            department: userData.department || 'General'
        };
        const mockToken = 'demo-jwt-token-kmrl-docmantra';
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { access_token: mockToken, user: mockUser, isDemo: true };
    }
};

// Login user
export const login = async (username, password) => {
    try {
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
    } catch (err) {
        console.warn('Backend unavailable, using frontend demo mode for login.');
        const mockUser = {
            id: 1,
            username: username || 'admin',
            full_name: username ? (username.charAt(0).toUpperCase() + username.slice(1)) : 'KMRL Administrator',
            email: `${username || 'admin'}@kmrl.co.in`,
            role: 'Admin',
            department: 'Engineering'
        };
        const mockToken = 'demo-jwt-token-kmrl-docmantra';
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return { access_token: mockToken, user: mockUser, isDemo: true };
    }
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