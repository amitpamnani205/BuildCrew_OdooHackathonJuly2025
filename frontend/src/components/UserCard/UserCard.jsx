import React from 'react';
import './UserCard.css';

const UserCard = ({ 
  user, 
  onRequest, 
  isLoggedIn,
  loading = false,
  error = null 
}) => {
  if (error) {
    return (
      <div className="user-card error">
        <p>Error loading user data. Please try again later.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="user-card loading">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-content">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      </div>
    );
  }

  const { 
    profilePhoto, 
    name, 
    skillsOffered, 
    skillsWanted,
    rating 
  } = user;

  const handleRequest = () => {
    if (!isLoggedIn) {
      // Show login prompt
      window.location.href = '/login?redirect=home';
      return;
    }
    onRequest(user.id);
  };

  return (
    <div className="user-card">
      <div className="card-left">
        <div className="profile-photo">
          <img 
            src={profilePhoto} 
            alt={`${name}'s profile`} 
            onError={(e) => {
              e.target.src = '/default-avatar.png';
              e.target.onerror = null;
            }}
          />
        </div>
      </div>
      
      <div className="card-middle">
        <h3 className="user-name">{name}</h3>
        
        <div className="skills-section">
          <div className="skills-offered">
            <span className="skills-label">Skills Offered:</span>
            <div className="skills-tags">
              {skillsOffered.map((skill, index) => (
                <span key={`offered-${index}`} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="skills-wanted">
            <span className="skills-label">Skills Wanted:</span>
            <div className="skills-tags">
              {skillsWanted.map((skill, index) => (
                <span key={`wanted-${index}`} className="skill-tag wanted">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card-right">
        <button 
          className="request-btn"
          onClick={handleRequest}
          disabled={!isLoggedIn}
        >
          Request
        </button>
      </div>

      <div className="rating">
        Rating: <span className="rating-value">{rating}/5</span>
      </div>
    </div>
  );
};

export default UserCard; 