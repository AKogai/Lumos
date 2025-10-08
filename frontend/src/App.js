import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/health')
      .then(response => response.json())
      .then(data => {
        setHealth(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full Stack Application</h1>
        <div className="status-container">
          <h2>Backend Status</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">Error: {error}</p>}
          {health && (
            <div className="health-info">
              <p>Status: <span className="success">{health.status}</span></p>
              <p>Message: {health.message}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
