import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import UserCard from '../components/UserCard/UserCard';
import Pagination from '../components/Pagination/Pagination';
import './Home.css';

const ITEMS_PER_PAGE = 10;

const availabilityOptions = [
  { value: 'available', label: 'Available Now' },
  { value: 'this_week', label: 'This Week' },
  { value: 'next_week', label: 'Next Week' },
  { value: 'this_month', label: 'This Month' }
];

// Simulated data - replace with actual API calls
const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  profilePhoto: `https://i.pravatar.cc/150?u=${i + 1}`,
  skillsOffered: ['React', 'Node.js', 'Python'].slice(0, (i % 3) + 1),
  skillsWanted: ['Vue', 'Angular', 'Java'].slice(0, (i % 3) + 1),
  rating: (Math.random() * 2 + 3).toFixed(1)
}));

function Home({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState({
    term: '',
    availability: 'all'
  });

  // Get search params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchParams({
      term: params.get('search') || '',
      availability: params.get('availability') || 'all'
    });
    setCurrentPage(parseInt(params.get('page')) || 1);
  }, [location]);

  const updateURL = useCallback((params) => {
    const searchParams = new URLSearchParams();
    if (params.term) searchParams.set('search', params.term);
    if (params.availability !== 'all') searchParams.set('availability', params.availability);
    if (params.page > 1) searchParams.set('page', params.page);
    navigate(`?${searchParams.toString()}`);
  }, [navigate]);

  // Fetch users based on search params
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredUsers = [...mockUsers];
      
      // Apply search filter
      if (searchParams.term) {
        const searchTerm = searchParams.term.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm)) ||
          user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm))
        );
      }
      
      // Apply availability filter
      if (searchParams.availability !== 'all') {
        // In real app, this would be handled by the backend
        filteredUsers = filteredUsers.filter(() => Math.random() > 0.5);
      }
      
      setTotalPages(Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
      
      // Apply pagination
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedUsers = filteredUsers.slice(start, start + ITEMS_PER_PAGE);
      
      setUsers(paginatedUsers);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [searchParams, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = ({ term, availability }) => {
    const newParams = { ...searchParams, term, availability, page: 1 };
    setSearchParams(newParams);
    setCurrentPage(1);
    updateURL({ ...newParams, page: 1 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateURL({ ...searchParams, page });
  };

  const handleRequest = async (userId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      alert(`Request sent to user ${userId}`);
    } catch (err) {
      console.error('Error sending request:', err);
      alert('Failed to send request. Please try again later.');
    }
  };

  return (
    <div className="home-container">
      <main className="home-content">
        <SearchBar
          onSearch={handleSearch}
          availabilityOptions={availabilityOptions}
        />

        {error ? (
          <div className="error-container" role="alert">
            <p>{error}</p>
            <button onClick={fetchUsers}>Try Again</button>
          </div>
        ) : (
          <>
            <div className="users-grid">
              {loading ? (
                // Show skeleton loading for users
                Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <UserCard
                    key={`skeleton-${index}`}
                    loading={true}
                    user={{}}
                    onRequest={() => {}}
                    isLoggedIn={isLoggedIn}
                  />
                ))
              ) : users.length > 0 ? (
                users.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onRequest={handleRequest}
                    isLoggedIn={isLoggedIn}
                  />
                ))
              ) : (
                <div className="no-results">
                  <p>No users found matching your criteria.</p>
                </div>
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default Home; 