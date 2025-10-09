import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export const CondolenceSelect = ({
  suggestions,
  onAfterSave
}: {
  suggestions: Array<string>;
  onAfterSave: (selectedCondolence: string, name: string) => void;
}) => {
  const [name, setName] = useState('');
  const [condolence, setCondolence] = useState(suggestions[0] ?? '');
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const updateSelectedIdx = (idx: number) => {
    if (idx !== selectedIdx) {
      setCondolence(suggestions[idx]);
    }
    setSelectedIdx(idx);
  };

  const handleSaveCondolence = () => {
    onAfterSave(condolence, name);
    enqueueSnackbar(`Condolence posted!`, { variant: 'success' });
  };

  return (
    <Stack spacing={3} direction="column">
      {suggestions?.length > 0 && (
        <>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Choose a condolence suggestion:
            </Typography>
            <Stack spacing={2}>
              {suggestions.map((s, index) => (
                <Box
                  key={index}
                  sx={(theme) => ({
                    position: 'relative',
                    padding: 2,
                    borderStyle: 'solid',
                    borderWidth: index === selectedIdx ? 2 : 1,
                    borderColor: index === selectedIdx ? theme.palette.primary.main : '#ccc',
                    backgroundColor: index === selectedIdx ? theme.palette.primary.light + '15' : 'transparent',
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: theme.palette.primary.light + '10',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                  })}
                  onClick={() => updateSelectedIdx(index)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography fontWeight={index === selectedIdx ? 600 : 400}>
                      Option #{index + 1}: {s}
                    </Typography>
                    {index === selectedIdx && (
                      <CheckCircleIcon
                        color="primary"
                        sx={{ flexShrink: 0, mt: 0.2 }}
                      />
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Edit your condolence:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              You can modify the selected text below before posting
            </Typography>
            <TextField
              multiline
              rows={4}
              value={condolence}
              onChange={(event) => setCondolence(event.target.value)}
              label="Your Condolence"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.02)'
                }
              }}
              fullWidth
            />
          </Box>

          <TextField placeholder="First and Last Name" onChange={(event) => setName(event.target.value)} />
          <Button disabled={!name} onClick={handleSaveCondolence} variant="contained">
            Post Condolence
          </Button>
        </>
      )}

      {suggestions?.length === 0 && (
        <>
          <TextField
            multiline
            rows={4}
            value={condolence}
            onChange={(event) => setCondolence(event.target.value)}
            label="Your Condolence"
            fullWidth
          />
          <TextField placeholder="First and Last Name" onChange={(event) => setName(event.target.value)} />
          <Button disabled={!name} onClick={handleSaveCondolence} variant="contained">
            Post Condolence
          </Button>
        </>
      )}
    </Stack>
  );
};
