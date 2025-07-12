import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    location: 'New York, USA',
    skillsOffered: ['Web Design', 'UX Design', 'Marketing'],
    skillsWanted: ['Python', 'React.js'],
    availability: 'weekends',
    profileType: 'Public',
    photoUrl: 'https://i.pravatar.cc/150?img=3'
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e, type) => {
    const { value } = e.target;
    const skills = value.split(',').map(skill => skill.trim());
    setTempProfile(prev => ({
      ...prev,
      [type]: skills
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Please upload an image file (JPEG, PNG, or GIF)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile(prev => ({
          ...prev,
          photoUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="action-buttons">
          {isEditing ? (
            <>
              <button className="action-button save-button" onClick={handleSave}>
                Save
              </button>
              <button className="action-button discard-button" onClick={handleDiscard}>
                Discard
              </button>
            </>
          ) : (
            <button className="action-button edit-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
          <button 
            className="action-button nav-button" 
            onClick={() => handleNavigation('/requests')}
          >
            Swap Request
          </button>
          <button 
            className="action-button nav-button" 
            onClick={() => handleNavigation('/')}
          >
            Home
          </button>
          <div className="profile-photo-small">
            <img src={profile.photoUrl} alt="Profile" />
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-fields">
            <div className="field-group">
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={tempProfile.name}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="field-value">{profile.name}</div>
              )}
            </div>

            <div className="field-group">
              <label>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={tempProfile.location}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="field-value">{profile.location}</div>
              )}
            </div>

            <div className="field-group">
              <label>Skills Offered</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.skillsOffered.join(', ')}
                  onChange={(e) => handleSkillsChange(e, 'skillsOffered')}
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                <div className="skills-container">
                  {profile.skillsOffered.map((skill, index) => (
                    <span key={index} className="skill-chip offered">{skill}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="field-group">
              <label>Skills Wanted</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempProfile.skillsWanted.join(', ')}
                  onChange={(e) => handleSkillsChange(e, 'skillsWanted')}
                  placeholder="Enter skills separated by commas"
                />
              ) : (
                <div className="skills-container">
                  {profile.skillsWanted.map((skill, index) => (
                    <span key={index} className="skill-chip wanted">{skill}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="field-group">
              <label>Availability</label>
              {isEditing ? (
                <input
                  type="text"
                  name="availability"
                  value={tempProfile.availability}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="field-value">{profile.availability}</div>
              )}
            </div>

            <div className="field-group">
              <label>Profile</label>
              {isEditing ? (
                <select
                  name="profileType"
                  value={tempProfile.profileType}
                  onChange={handleInputChange}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              ) : (
                <div className="field-value">{profile.profileType}</div>
              )}
            </div>
          </div>

          <div className="profile-photo-section">
            <div className="profile-photo-large">
              <img src={tempProfile.photoUrl} alt="Profile" />
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                  />
                  <button 
                    className="edit-photo-button"
                    onClick={() => document.getElementById('photo-upload').click()}
                  >
                    Change Photo
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 