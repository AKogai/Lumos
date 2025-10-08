import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

export const CondolenceSelect = ({
  suggestions,
  onAfterSave
}: {
  suggestions: Array<string>;
  onAfterSave: (selectedCondolence: string, name: string) => void;
}) => {
  const [name, setName] = useState('');
  const [condolence, setCondolence] = useState(suggestions[0] || '');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const updateSelectedIdx = (index: number) => {
    if (index !== selectedIdx) {
      setCondolence(suggestions[index]);
    }
    setSelectedIdx(index);
  };

  const handleSaveCondolence = () => {
    onAfterSave(condolence, name);
  };

  return (
    <Stack spacing={2} direction="column">
      {suggestions.map((s, index) => (
        <Box
          key={index}
          sx={(theme) => ({
            padding: 2,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: index === selectedIdx ? theme.palette.primary.main : ' #ccc',
            borderRadius: 1,
            cursor: 'pointer'
          })}
          onClick={() => updateSelectedIdx(index)}
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
