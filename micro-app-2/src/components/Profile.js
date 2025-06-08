import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ globalContext }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    location: '',
    phone: '',
    company: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load user data from Context7
    if (globalContext && globalContext.state.user.id) {
      setProfileData({
        name: globalContext.state.user.name || '',
        email: globalContext.state.user.email || '',
        role: globalContext.state.user.role || '',
        bio: 'Passionate developer building amazing microfrontend applications with React and Qiankun.',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567',
        company: 'Tech Innovation Inc.'
      });
    }
  }, [globalContext]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Update Context7 with new user data
    if (globalContext) {
      globalContext.actions.setUser({
        ...globalContext.state.user,
        name: profileData.name,
        email: profileData.email,
        role: profileData.role
      });

      // Update shared data
      globalContext.actions.setSharedData({
        'micro-app-2': {
          lastUpdated: new Date().toISOString(),
          profileData: profileData,
          status: 'updated'
        }
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    if (globalContext && globalContext.state.user.id) {
      setProfileData({
        name: globalContext.state.user.name || '',
        email: globalContext.state.user.email || '',
        role: globalContext.state.user.role || '',
        bio: 'Passionate developer building amazing microfrontend applications with React and Qiankun.',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567',
        company: 'Tech Innovation Inc.'
      });
    }
    setIsEditing(false);
  };

  const theme = globalContext?.state?.theme || 'light';

  return (
    <div className={`profile theme-${theme}`}>
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar">
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : '👤'}
            </div>
            <div className="user-status">
              {globalContext?.state?.user?.id ? (
                <span className="status online">Online</span>
              ) : (
                <span className="status offline">Offline</span>
              )}
            </div>
          </div>
          
          <div className="profile-actions">
            {globalContext && (
              <div className="context7-indicator">
                <span className="indicator-dot"></span>
                Context7 Connected
              </div>
            )}
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  💾 Save
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  ❌ Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="info-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-field">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{profileData.name || 'Not specified'}</span>
                )}
              </div>

              <div className="info-field">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{profileData.email || 'Not specified'}</span>
                )}
              </div>

              <div className="info-field">
                <label>Role</label>
                {isEditing ? (
                  <select
                    name="role"
                    value={profileData.role}
                    onChange={handleInputChange}
                    className="edit-input"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                ) : (
                  <span className="info-value">{profileData.role || 'Not specified'}</span>
                )}
              </div>

              <div className="info-field">
                <label>Company</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={profileData.company}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{profileData.company}</span>
                )}
              </div>

              <div className="info-field">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{profileData.location}</span>
                )}
              </div>

              <div className="info-field">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{profileData.phone}</span>
                )}
              </div>
            </div>

            <div className="bio-section">
              <label>Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="edit-textarea"
                  rows="4"
                />
              ) : (
                <p className="bio-text">{profileData.bio}</p>
              )}
            </div>
          </div>

          {globalContext && (
            <div className="context7-data">
              <h2>Shared Context Data</h2>
              <div className="context-display">
                <div className="context-item">
                  <strong>Current User:</strong> {globalContext.state.user.name || 'Guest'}
                </div>
                <div className="context-item">
                  <strong>Theme:</strong> {globalContext.state.theme}
                </div>
                <div className="context-item">
                  <strong>Language:</strong> {globalContext.state.language}
                </div>
                <div className="context-item">
                  <strong>Loaded Apps:</strong> {globalContext.state.loadedMicroApps.join(', ') || 'None'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 