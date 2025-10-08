import { useState, useEffect } from 'react';
import './App.css';
import { Stepper } from './components/stepper/stepper';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getCases } from './api/funeral-cases';
import { enqueueSnackbar } from 'notistack';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/health`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setLoading(false);
      });
  }, []);

  const { data: memorials } = useQuery({
    queryFn: getCases,
    queryKey: ['memorial-cases'],
    enabled: !!health && !loading
  });

  const handleWriteCondolence = (profile) => {
    setSelectedProfile(profile);
  };

  const handleBackToList = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="app">
      <section className="hero">
        <h1>Condolence helpers</h1>
      </section>

      <main className="content">
        {!selectedProfile ? (
          <>
            <h2 className="section-title">Remembering our loved ones</h2>
            <div className="profiles-grid">
              {memorials?.data?.map((p) => (
                <div className="profile-card" key={p.id}>
                  <img
                    src={
                      p.profileImageUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        p.firstName + ' ' + p.lastName
                      )}&background=random`
                    }
                    alt={`${p.firstName} ${p.lastName}`}
                  />
                  <div className="profile-content">
                    <h3>
                      {p.firstName} {p.middleName ? p.middleName + ' ' : ''}
                      {p.lastName}
                    </h3>
                    <p className="lifespan">
                      {p.bornDate} – {p.deathDate}
                    </p>
                    <p className="bio">
                      {p.biography.length > 160 ? p.biography.substring(0, 160) + '...' : p.biography}
                    </p>
                    <p className="location">
                      {p.placeOfBirth} → {p.placeOfDeath}
                    </p>
                    <button type="button" className="read-more" onClick={() => handleWriteCondolence(p)}>
                      Write condolence →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="memorial-stepper">
            <Button variant="outlined" onClick={handleBackToList}>
              ← Back to list
            </Button>
            <h2 className="section-title">
              Write a condolence for {selectedProfile.firstName} {selectedProfile.lastName}
            </h2>
            <ErrorBoundary fallback={<Typography>Something went wrong in the Stepper component.</Typography>}>
              {/* TODO: We could pass the id to the Stepper component */}
              {/* <Stepper profile={selectedProfile} /> */}
              <Stepper />
            </ErrorBoundary>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
