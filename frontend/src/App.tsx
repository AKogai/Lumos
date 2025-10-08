import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Stepper } from './components/stepper/stepper';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Button, Link, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getCases } from './api/funeral-cases';
import { enqueueSnackbar } from 'notistack';
import { MemorialCard } from './components/memorial-card/memorial-card';
import { MemorialDetails } from './components/memorial-details/memorial-details';
import { CondolenceSelect } from './components/condolence-select/condolence-select';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [isWritingCondolence, setIsWritingCondolence] = useState(false);
  const [condolencesForSelect, setCondolencesForSelect] = useState<Array<string>>([]);

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

  const handleWriteCondolence = () => {
    setIsWritingCondolence(true);
  };

  const handleBackToList = () => {
    setSelectedProfileId(null);
    setIsWritingCondolence(false);
    setCondolencesForSelect([]);
  };

  const selectedProfile = useMemo(
    () => memorials?.find((p) => p.id === selectedProfileId),
    [memorials, selectedProfileId]
  );

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
            Memorial Page Content Assistant
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
        {!selectedProfileId ? (
          <>
            <Typography sx={(theme) => ({ marginBottom: theme.spacing(4) })} variant="h3">
              Remembering our loved ones
            </Typography>
            <Box
              sx={(theme) => ({
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: theme.spacing(3)
              })}
            >
              {memorials?.map((p) => (
                <MemorialCard key={p.id} memorial={p} openMemorialDetails={setSelectedProfileId} />
              ))}
            </Box>
          </>
        ) : (
          <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Button variant="outlined" onClick={handleBackToList} sx={{ mb: 2 }}>
              <Typography fontWeight="500">← Back to list</Typography>
            </Button>
            {isWritingCondolence ? (
              <>
                {!condolencesForSelect.length ? (
                  <ErrorBoundary fallback={<Typography>Something went wrong in the Stepper component.</Typography>}>
                    <Stepper memorial={selectedProfile} onFinish={setCondolencesForSelect} />
                  </ErrorBoundary>
                ) : (
                  <CondolenceSelect suggestions={condolencesForSelect} />
                )}
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
