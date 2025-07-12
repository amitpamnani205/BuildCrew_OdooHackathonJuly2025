import React from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  // Mock data - replace with actual data from your backend
  const user = {
    name: "Marc Demo",
    profilePhoto: null,
    skillsOffered: [
      "React Development",
      "UI/UX Design",
      "Node.js"
    ],
    skillsWanted: [
      "Python Programming",
      "Data Science",
      "Machine Learning"
    ],
    rating: 4.5,
    testimonials: [
      {
        id: 1,
        author: "Sarah Johnson",
        role: "Frontend Developer",
        content: "Marc is an excellent teacher! His React expertise helped me understand complex concepts easily.",
        rating: 5
      },
      {
        id: 2,
        author: "Michael Chen",
        role: "Data Scientist",
        content: "Great collaboration on our UI/UX project. Very professional and knowledgeable.",
        rating: 4
      }
    ]
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`star ${star <= rating ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="profile-page">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <h1 className="brand">Skill Swap Platform</h1>
        </div>
        <div className="nav-right">
          <Link to="/swap-request" className="nav-link active">Swap request</Link>
          <Link to="/home" className="nav-link">Home</Link>
          <div className="nav-profile">
            <img src="/default-avatar.png" alt="Profile" className="nav-avatar" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Request Button */}
        <div className="request-section">
          <button className="request-button">Request</button>
        </div>

        {/* User Info Section */}
        <div className="user-info">
          <h2 className="user-name">{user.name}</h2>
          
          <div className="skills-container">
            <div className="skills-section">
              <h3>Skills Offered</h3>
              <ul className="skills-list">
                {user.skillsOffered.map((skill, index) => (
                  <li key={index} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>

            <div className="skills-section">
              <h3>Skills Wanted</h3>
              <ul className="skills-list">
                {user.skillsWanted.map((skill, index) => (
                  <li key={index} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>

            <div className="rating-section">
              <h3>Rating and Feedback</h3>
              <div className="rating-overview">
                <StarRating rating={user.rating} />
                <span className="rating-number">{user.rating} out of 5</span>
              </div>

              <div className="testimonials">
                {user.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="testimonial-author">
                        <h4>{testimonial.author}</h4>
                        <span className="author-role">{testimonial.role}</span>
                      </div>
                      <StarRating rating={testimonial.rating} />
                    </div>
                    <p className="testimonial-content">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Photo Section */}
        <div className="profile-photo-section">
          <div className="profile-photo">
            <span>Profile Photo</span>
          </div>
        </div>
      </div>

      {/* Page Border */}
      <div className="page-border"></div>
    </div>
  );
};

export default UserProfile; 