import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientContact from './components/Clientcontact';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddLead from './components/AddLead';
import EditLead from './components/EditLead';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/admin-login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Client Contact Form - Landing Page */}
          <Route path="/" element={<ClientContact />} />
          
          {/* Admin Login */}
          <Route path="/admin-login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-lead" 
            element={
              <ProtectedRoute>
                <AddLead />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-lead/:id" 
            element={
              <ProtectedRoute>
                <EditLead />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;