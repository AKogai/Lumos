import { useState, useEffect } from 'react';
import './App.css';
import { Stepper } from './components/stepper/stepper';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Button, Link, Typography } from '@mui/material';
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
    <>
      <Box
        sx={(theme) => ({
          background: 'linear-gradient(90deg, rgba(240,228,250,1) 0%, rgba(220,210,250,1) 100%)',
          textAlign: 'center',
          paddingX: theme.spacing(2.5),
          paddingY: theme.spacing(10)
        })}
      >
        <Link href="/" sx={{ textDecoration: 'none', color: 'black' }}>
          <Typography sx={{ textDecoration: 'unset' }} variant="h1">
            Memorial Page AI Content Assistant
          </Typography>
        </Link>
      </Box>

      <Box
        sx={(theme) => ({
          paddingY: theme.spacing(7.5),
          paddingX: theme.spacing(10),
          maxWidth: 1200,
          margin: '0 auto'
        })}
      >
        {!selectedProfile ? (
          <>
            <Typography sx={(theme) => ({ marginBottom: theme.spacing(4) })} variant="h2">
              Remembering our loved ones
            </Typography>
            <Box
              sx={(theme) => ({
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: theme.spacing(3)
              })}
            >
                <MemorialCard key={p.id} memorial={p} openMemorialDetails={setSelectedProfile} />
              ))}
            </Box>
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
      </Box>
    </>
  );
}

export default App;
