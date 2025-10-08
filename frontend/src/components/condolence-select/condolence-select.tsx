import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { ParsedMessages } from '../stepper/response-parser.helper';

export const CondolenceSelect = ({
  suggestions,
  onAfterSave
}: {
  suggestions: ParsedMessages;
  onAfterSave: (selectedCondolence: string, name: string) => void;
}) => {
  const [name, setName] = useState('');
  const [condolence, setCondolence] = useState(suggestions.familyMessage || '');
  const [selectedIdx, setSelectedIdx] = useState<string>('familyMessage');

  const updateSelectedIdx = (key: string) => {
    if (key !== selectedIdx) {
      setCondolence(suggestions[key]);
    }
    setSelectedIdx(key);
  };

  const handleSaveCondolence = () => {
    onAfterSave(condolence, name);
    enqueueSnackbar(`Condolence posted!`, { variant: 'success' });
  };

  return (
    <Stack spacing={2} direction="column">
      {Object.entries(suggestions)?.map(([key, s], index) => (
        <Box
          key={index}
          sx={(theme) => ({
            padding: 2,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: key === selectedIdx ? theme.palette.primary.main : ' #ccc',
            borderRadius: 1,
            cursor: 'pointer'
          })}
          onClick={() => updateSelectedIdx(key)}
        >
          <Typography>{s}</Typography>
        </Box>
      ))}
      <TextField multiline rows={4} value={condolence} onChange={(event) => setCondolence(event.target.value)} />
      <TextField placeholder="First and Last Name" onChange={(event) => setName(event.target.value)} />
      <Button disabled={!name} onClick={handleSaveCondolence} variant="contained">
        Post Condolence
      </Button>
    </Stack>
  );
};
