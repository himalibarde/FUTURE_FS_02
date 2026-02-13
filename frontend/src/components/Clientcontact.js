import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function ClientContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create a new lead when client submits contact form
      const response = await axios.post(`${API_URL}/leads`, {
        name: formData.name,
        email: formData.email,
        notes: formData.message,
        source: 'Website',
        status: 'New',
        priority: 'Medium'
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-contact-container">
      <div className="client-contact-card">
        {/* Header Image */}
        <div className="contact-header-image">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=300&fit=crop" 
            alt="Team Meeting"
          />
        </div>

        {/* Title */}
        <div className="contact-header">
          <p className="contact-subtitle">CLIENT LEAD MANAGEMENT SYSTEM</p>
          <h1 className="contact-title">Get In Touch</h1>
        </div>

        {/* Success Message */}
        {success && (
          <div className="success-message">
            ✓ Thank you! We'll get back to you soon.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your requirements..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit-inquiry"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>

        {/* Footer */}
        <div className="contact-footer">
          <p className="footer-text">Internal Management Access Only</p>
          <button 
            className="btn-admin-portal"
            onClick={() => navigate('/admin-login')}
          >
            Enter Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientContact;