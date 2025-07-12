import { useState } from 'react';
import './SwapRequest.css';

const SwapRequest = () => {
  const [status, setStatus] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual API calls
  const requests = [
    {
      id: 1,
      name: 'Marc Demo',
      profilePhoto: 'https://i.pravatar.cc/150?img=1',
      rating: 3.9,
      skillsOffered: ['Java Script'],
      skillsWanted: ['Marketing'],
      status: 'pending'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      profilePhoto: 'https://i.pravatar.cc/150?img=2',
      rating: 4.2,
      skillsOffered: ['Python', 'Data Analysis'],
      skillsWanted: ['UI Design'],
      status: 'rejected'
    }
  ];

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAccept = (id) => {
    console.log('Accepted request:', id);
  };

  const handleReject = (id) => {
    console.log('Rejected request:', id);
  };

  const filteredRequests = requests.filter(request => 
    request.status === status &&
    (request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     request.skillsOffered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
     request.skillsWanted.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="swap-request-container">
      <h1 className="page-title">Skill Swap Requests</h1>

      <div className="filters">
        <select 
          value={status} 
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or skills..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <div className="requests-list">
        {filteredRequests.map((request) => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <div className="user-info">
                <img
                  src={request.profilePhoto}
                  alt={request.name}
                  className="profile-photo"
                />
                <div className="user-details">
                  <h3 className="user-name">{request.name}</h3>
                  <div className="rating">
                    <span className="star">⭐</span>
                    <span>{request.rating}/5</span>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                {request.status === 'pending' && (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(request.id)}
                    >
                      ✓ Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(request.id)}
                    >
                      ✕ Reject
                    </button>
                  </>
                )}
                {request.status === 'accepted' && (
                  <span className="status-chip accepted">Accepted</span>
                )}
                {request.status === 'rejected' && (
                  <span className="status-chip rejected">Rejected</span>
                )}
              </div>
            </div>

            <div className="skills-section">
              <div className="skills-row">
                <span className="skills-label">Skills Offered:</span>
                <div className="skills-chips">
                  {request.skillsOffered.map((skill, index) => (
                    <span key={index} className="skill-chip offered">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="skills-row">
                <span className="skills-label">Skills Wanted:</span>
                <div className="skills-chips">
                  {request.skillsWanted.map((skill, index) => (
                    <span key={index} className="skill-chip wanted">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwapRequest; 