import { useState, useEffect } from 'react';
import './App.css';
import { Stepper } from './components/stepper/stepper';
import { ErrorBoundary } from 'react-error-boundary';
import { Typography } from '@mui/material';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/memorial`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
      })
      .catch(() => {});
  }, []);

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
              {profiles.map((p) => (
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
            <button className="back-btn" onClick={handleBackToList}>
              ← Back to list
            </button>
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

