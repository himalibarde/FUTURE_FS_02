import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Admin';

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leads`, {
        headers: { 'x-auth-token': token }
      });
      
      if (response.data.success) {
        setLeads(response.data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leads/stats/summary`, {
        headers: { 'x-auth-token': token }
      });
      
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/leads/${id}`, {
          headers: { 'x-auth-token': token }
        });
        
        fetchLeads();
        fetchStats();
      } catch (error) {
        console.error('Error deleting lead:', error);
        alert('Failed to delete lead');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">📊</div>
          <h2>CRM Dashboard</h2>
        </div>
        <div className="navbar-actions">
          <span className="navbar-user">👋 {username}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </nav>

      {/* Stats Section */}
      <div className="stats-container">
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-header">
              <span className="stat-title">Total Leads</span>
              <div className="stat-icon">📈</div>
            </div>
            <div className="stat-number">{stats.total}</div>
          </div>

          <div className="stat-card new">
            <div className="stat-header">
              <span className="stat-title">New Leads</span>
              <div className="stat-icon">🆕</div>
            </div>
            <div className="stat-number">{stats.new}</div>
          </div>

          <div className="stat-card contacted">
            <div className="stat-header">
              <span className="stat-title">Contacted</span>
              <div className="stat-icon">📞</div>
            </div>
            <div className="stat-number">{stats.contacted}</div>
          </div>

          <div className="stat-card converted">
            <div className="stat-header">
              <span className="stat-title">Converted</span>
              <div className="stat-icon">✅</div>
            </div>
            <div className="stat-number">{stats.converted}</div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="leads-section">
          <div className="leads-header">
            <h2>All Leads</h2>
            <Link to="/add-lead">
              <button className="btn-add">
                <span className="plus-icon">+</span>
                Add New Lead
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : leads.length === 0 ? (
            <div className="no-leads">
              <div className="no-leads-icon">📭</div>
              <h3>No leads yet</h3>
              <p>Start by adding your first lead</p>
            </div>
          ) : (
            <div className="leads-table-container">
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id}>
                      <td><strong>{lead.name}</strong></td>
                      <td>{lead.email}</td>
                      <td>{lead.phone || '-'}</td>
                      <td>{lead.company || '-'}</td>
                      <td>{lead.source}</td>
                      <td>
                        <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td>
                        <span className={`priority-badge priority-${lead.priority.toLowerCase()}`}>
                          {lead.priority}
                        </span>
                      </td>
                      <td>{formatDate(lead.createdAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <Link to={`/edit-lead/${lead._id}`}>
                            <button className="btn-edit">Edit</button>
                          </Link>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDelete(lead._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;