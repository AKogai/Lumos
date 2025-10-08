import { useState, useEffect } from 'react';
import './App.css';
import { Stepper } from './components/stepper/stepper';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getCases } from './api/funeral-cases';
import { enqueueSnackbar } from 'notistack';
import { MemorialCard } from './components/memorial-card/memorial-card';
import { MemorialDetails } from './components/memorial-details/memorial-details';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isWritingCondolence, setIsWritingCondolence] = useState(false);

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
    enabled: !!health && !loading,
    select: (res) => res.data.map((item) => ({ ...item, condolences: [] }))
  });

  const handleWriteCondolence = () => {
    setIsWritingCondolence(true);
  };

  const handleBackToList = () => {
    setSelectedProfile(null);
    setIsWritingCondolence(false);
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
              {memorials?.map((p) => (
                <MemorialCard key={p.id} memorial={p} openMemorialDetails={setSelectedProfile} />
              ))}
            </div>
          </>
        ) : (
          <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Button variant="outlined" onClick={handleBackToList} sx={{ mb: 2 }}>
              ← Back to list
            </Button>
            {isWritingCondolence ? (
              <>
                <ErrorBoundary fallback={<Typography>Something went wrong in the Stepper component.</Typography>}>
                  <Stepper memorial={selectedProfile} />
                </ErrorBoundary>
              </>
            ) : (
              <>
                <MemorialDetails
                  selectedProfile={selectedProfile}
                  handleBackToList={handleBackToList}
                  handleWriteCondolence={handleWriteCondolence}
                />
              </>
            )}
          </Box>
        )}
      </main>
    </div>
  );
}

export default App;
