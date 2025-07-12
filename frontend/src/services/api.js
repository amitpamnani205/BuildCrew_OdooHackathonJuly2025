
const API_BASE_URL = 'http://localhost:2000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { 'Authorization': `Bearer ${this.token}` })
      },
      ...options
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async register(name, email, password, confirmPassword) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: { name, email, password, confirmPassword }
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  async getProfile() {
    return await this.request('/auth/me');
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Utility methods
  isAuthenticated() {
    return !!this.token;
  }

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // WebSocket connection (for real-time features)
  connectWebSocket() {
    const wsUrl = 'ws://localhost:2000';
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      console.log('WebSocket connected');
      
      // Join user room if authenticated
      const user = this.getStoredUser();
      if (user) {
        socket.send(JSON.stringify({
          type: 'join-user-room',
          userId: user._id
        }));
      }
    };
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message:', data);
      
      // Handle real-time updates
      if (data.type === 'notification') {
        this.handleNotification(data);
      }
    };
    
    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return socket;
  }

  handleNotification(notification) {
    // Handle incoming notifications
    console.log('New notification:', notification);
    
    // You can dispatch events or update UI here
    const event = new CustomEvent('notification', {
      detail: notification
    });
    window.dispatchEvent(event);
  }
}

const apiService = new ApiService();
export default apiService; 