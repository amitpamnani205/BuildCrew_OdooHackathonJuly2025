import React, { useState, useCallback, useMemo } from 'react';
import { debounce } from '../utils/helpers';
import Button from './common/Button';
import Input from './common/Input';
import './RequestsPage.css';

const ITEMS_PER_PAGE = 10;
const REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};

const RequestsPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('received');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data - replace with actual API calls
  const [requests] = useState({
    sent: [
      {
        id: 1,
        recipient: 'John Doe',
        skill: 'React Development',
        status: 'pending',
        date: '2024-07-15',
        message: 'I would like to learn React from you.'
      },
      // Add more mock data as needed
    ],
    received: [
      {
        id: 2,
        sender: 'Jane Smith',
        skill: 'UI/UX Design',
        status: 'pending',
        date: '2024-07-14',
        message: 'I can teach you UI/UX design basics.'
      },
      // Add more mock data as needed
    ]
  });

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setCurrentPage(1); // Reset to first page on search
    }, 300),
    []
  );

  // Filter and search logic
  const filteredRequests = useMemo(() => {
    let filtered = requests[activeTab];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => {
        const searchableText = activeTab === 'sent'
          ? `${request.recipient} ${request.skill} ${request.message}`
          : `${request.sender} ${request.skill} ${request.message}`;
        return searchableText.toLowerCase().includes(query);
      });
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    return filtered;
  }, [requests, activeTab, searchQuery, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Request action handlers
  const handleRequestAction = async (requestId, action) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update request status logic here
      console.log(`Request ${requestId} ${action}`);
      
      // Show success message
    } catch (err) {
      setError('Failed to process request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Breadcrumb component
  const Breadcrumb = () => (
    <nav className="breadcrumb">
      <span>Home</span>
      <span className="separator">/</span>
      <span>Requests</span>
      <span className="separator">/</span>
      <span className="current">{activeTab === 'sent' ? 'Sent' : 'Received'}</span>
    </nav>
  );

  return (
    <div className="requests-page">
      <Breadcrumb />
      
      <div className="requests-header">
        <h1>Skill Swap Requests</h1>
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'received' ? 'active' : ''}`}
            onClick={() => setActiveTab('received')}
          >
            Received
          </button>
          <button
            className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
            onClick={() => setActiveTab('sent')}
          >
            Sent
          </button>
        </div>
      </div>

      <div className="filters">
        <Input
          type="text"
          placeholder="Search requests..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value={REQUEST_STATUS.PENDING}>Pending</option>
          <option value={REQUEST_STATUS.ACCEPTED}>Accepted</option>
          <option value={REQUEST_STATUS.REJECTED}>Rejected</option>
        </select>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
          <button onClick={() => setError(null)} className="close-error">
            ×
          </button>
        </div>
      )}

      <div className="requests-list">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : paginatedRequests.length === 0 ? (
          <div className="no-requests">
            No requests found. {searchQuery && 'Try adjusting your search.'}
          </div>
        ) : (
          paginatedRequests.map(request => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <span className={`status-badge ${request.status}`}>
                  {request.status}
                </span>
                <span className="request-date">{request.date}</span>
              </div>
              
              <div className="request-body">
                <h3>
                  {activeTab === 'sent' ? request.recipient : request.sender}
                </h3>
                <p className="skill-name">{request.skill}</p>
                <p className="message">{request.message}</p>
              </div>

              {activeTab === 'received' && request.status === 'pending' && (
                <div className="request-actions">
                  <Button
                    variant="success"
                    size="small"
                    onClick={() => handleRequestAction(request.id, 'accept')}
                    disabled={isLoading}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleRequestAction(request.id, 'reject')}
                    disabled={isLoading}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <Button
            variant="secondary"
            size="small"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            size="small"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestsPage; 