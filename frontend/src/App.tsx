import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Stepper } from './components/stepper/stepper';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Button, Link, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCases, MemorialCaseResponse } from './api/funeral-cases';
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
  const [shouldShowStepper, setShouldShowStepper] = useState(false);
  const queryClient = useQueryClient();

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

  const handleBackClick = () => {
    if (selectedProfileId) {
      if (!isWritingCondolence) {
        setSelectedProfileId(null);
      } else {
        if (shouldShowStepper) {
          setShouldShowStepper(false);
          setCondolencesForSelect([]);
        } else {
          setIsWritingCondolence(false);
        }
      }
    }
  };

  const selectedProfile = useMemo(
    () => memorials?.find((p) => p.id === selectedProfileId),
    [memorials, selectedProfileId]
  );

  const fakeUpdateApiData = (savedCondolence: string, name: string) => {
    queryClient.setQueryData(['memorial-cases'], (old: Array<MemorialCaseResponse>) => {
      const updated = old.map((item) =>
        item.id === selectedProfileId
          ? {
              ...item,
              condolences: [...item.condolences, { message: savedCondolence, name }]
            }
          : item
      );

      return updated;
    });

    setIsWritingCondolence(false);
    setCondolencesForSelect([]);
    setShouldShowStepper(false);
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          position: 'relative',
          background: 'linear-gradient(90deg, rgba(240,228,250,1) 0%, rgba(220,210,250,1) 100%)',
          textAlign: 'center',
          paddingX: theme.spacing(2.5),
          paddingY: theme.spacing(10)
        })}
      >
        <img
          src={'/hero.jpg'}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
        <Link
          href="/"
          sx={{
            position: 'relative',
            textDecoration: 'none',
            color: 'black',
            zIndex: 1
          }}
        >
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
                gap: theme.spacing(3),
                alignItems: 'stretch'
              })}
            >
              {memorials?.map((p) => (
                <MemorialCard key={p.id} memorial={p} openMemorialDetails={setSelectedProfileId} />
              ))}
            </Box>
          </>
        ) : (
          <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Button variant="outlined" onClick={handleBackClick} sx={{ mb: 2 }}>
              <Typography fontWeight="500">← Back</Typography>
            </Button>
            {isWritingCondolence ? (
              <>
                {shouldShowStepper ? (
                  <>
                    {!condolencesForSelect ? (
                      <ErrorBoundary fallback={<Typography>Something went wrong in the Stepper component.</Typography>}>
                        <Stepper memorial={selectedProfile} onFinish={setCondolencesForSelect} />
                      </ErrorBoundary>
                    ) : (
                      <CondolenceSelect suggestions={condolencesForSelect} onAfterSave={fakeUpdateApiData} />
                    )}
                  </>
                ) : (
                  <>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => setShouldShowStepper(true)}
                        sx={{ mb: 2, width: '100%' }}
                      >
                        Start AI Condolence Assistant
                      </Button>
                    </Box>
                    <CondolenceSelect suggestions={null} onAfterSave={fakeUpdateApiData} />
                  </>
                )}
              </>
            ) : (
              <>
                <MemorialDetails selectedProfile={selectedProfile} handleWriteCondolence={handleWriteCondolence} />
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

export default App;
