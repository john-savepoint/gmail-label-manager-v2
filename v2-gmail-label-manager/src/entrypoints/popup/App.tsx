import React, { useState, useEffect } from 'react';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await browser.identity.getAuthToken({ interactive: false });
      setIsAuthenticated(!!token);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async () => {
    setLoading(true);
    const response = await browser.runtime.sendMessage({ type: 'AUTH_REQUEST' });
    if (response.success) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gmail Label Manager</h1>
        <span className="version">v2.0.0</span>
      </header>
      
      <main className="app-main">
        {!isAuthenticated ? (
          <div className="auth-section">
            <p>Connect your Gmail account to get started</p>
            <button onClick={handleAuth} className="auth-button">
              Connect Gmail
            </button>
          </div>
        ) : (
          <div className="dashboard">
            <p>Welcome to Gmail Label Manager!</p>
            <p className="success">✓ Connected to Gmail</p>
            <div className="actions">
              <button className="action-button">Manage Labels</button>
              <button className="action-button">Settings</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}