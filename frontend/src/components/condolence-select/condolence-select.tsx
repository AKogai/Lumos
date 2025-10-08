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
  const [condolence, setCondolence] = useState(suggestions?.familyMessage || '');
  const [selectedKey, setSelectedKey] = useState<string>('familyMessage');

  const updateSelectedKey = (key: string) => {
    if (key !== selectedKey) {
      setCondolence(suggestions[key]);
    }
    setSelectedKey(key);
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
            borderColor: key === selectedKey ? theme.palette.primary.main : ' #ccc',
            borderRadius: 1,
            cursor: 'pointer'
          })}
          onClick={() => updateSelectedKey(key)}
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
