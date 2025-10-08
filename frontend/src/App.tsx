import { useState, useEffect } from 'react';
import './App.css';
import { Stepper } from './components/stepper/stepper';
import { ErrorBoundary } from 'react-error-boundary';
import { Typography } from '@mui/material';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/health`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
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
              <p>
                Status: <span className="success">{health.status}</span>
              </p>
              <p>Message: {health.message}</p>
            </div>
          )}

          {!loading && !error && (
            <ErrorBoundary fallback={<Typography>Something went wrong in the Stepper component.</Typography>}>
              <Stepper />
            </ErrorBoundary>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
