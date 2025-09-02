import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import SchoolList from './components/SchoolList';
import AddSchool from './components/AddSchool';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const appStyles = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    minWidth: '100vw',
    // maxWidth: '500vw'
  };

  const containerStyles = {
    display: 'flex',
    minHeight: '100vh'
  };

  const contentStyles = {
    flex: 1,
    padding: '20px',
    marginLeft: isAuthenticated ? '250px' : '0',
    transition: 'margin-left 0.3s ease'
  };

  // Check if user is already logged in on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.user);
        setCurrentPage('dashboard');
      } else {
        setIsAuthenticated(false);
        setCurrentPage('login');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setCurrentPage('login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('login');
    // Clear any stored tokens/cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: '#666'
        }}>
          Loading...
        </div>
      );
    }

    if (!isAuthenticated) {
      if (currentPage === 'signup') {
        return <Signup onSwitchToLogin={() => setCurrentPage('login')} onLogin={handleLogin} />;
      }
      return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'schools':
        return <SchoolList />;
      case 'add-school':
        return <AddSchool onSuccess={() => setCurrentPage('schools')} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div style={appStyles}>
      <div style={containerStyles}>
        {isAuthenticated && (
          <Navigation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            user={user}
            onLogout={handleLogout}
          />
        )}
        <div style={contentStyles}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
