import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function AddLead() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website',
    status: 'New',
    priority: 'Medium',
    notes: '',
    followUpDate: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/leads`, formData);
      
      if (response.data.success) {
        alert('Lead added successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error adding lead:', error);
      alert('Failed to add lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">📊</div>
          <h2>CRM Dashboard</h2>
        </div>
        <div className="navbar-actions">
          <Link to="/dashboard">
            <button className="btn-logout">← Back to Dashboard</button>
          </Link>
        </div>
      </nav>

      {/* Form Card */}
      <div className="form-card fade-in">
        <div className="form-card-header">
          <h1>Add New Lead</h1>
          <p>Fill in the details to create a new lead in your CRM</p>
        </div>

        <form onSubmit={handleSubmit} className="lead-form">
          {/* Row 1: Name & Email */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Acme Corporation"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Source & Status */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="source">Lead Source</label>
              <select
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Email Campaign">Email Campaign</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Event">Event</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          {/* Row 4: Priority & Follow-up Date */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="followUpDate">Follow-up Date</label>
              <input
                type="date"
                id="followUpDate"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Add any additional information about this lead..."
              value={formData.notes}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? 'Adding Lead...' : '✓ Add Lead'}
            </button>
            <Link to="/dashboard" style={{ flex: 1 }}>
              <button type="button" className="btn-cancel" style={{ width: '100%' }}>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLead;