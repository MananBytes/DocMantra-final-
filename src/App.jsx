import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './components/Toast';
import api from './services/api';
import { isAuthenticated } from './services/auth';

import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import UploadPage from './pages/Upload';
import SearchPage from './pages/Search';
import ChatPage from './pages/Chat';
import RaisedCardsPage from './pages/RaisedCards';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Landing from './pages/Landing';

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  );
}

export default function App() {
  useEffect(() => {
    api.get('/api/health')
      .then(() => console.log('✅ BACKEND CONNECTED'))
      .catch(() => console.error('❌ BACKEND ERROR'));
  }, []);

  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/welcome" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Root redirect */}
          <Route
            path="/"
            element={
              isAuthenticated()
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/welcome" replace />
            }
          />

          {/* Protected layout (no path — wraps children) */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/raised-cards" element={<RaisedCardsPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}