import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

export const CondolenceSelect = ({ suggestions }: { suggestions: Array<string> }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSettingValue, setIsSettingValue] = useState(false);

  const currentDefaultValue = useMemo(() => suggestions[selectedIdx] || '', [selectedIdx, suggestions]);

  const updateSelectedIdx = (index: number) => {
    setIsSettingValue(true);
    setSelectedIdx(index === selectedIdx ? null : index);
    setTimeout(() => setIsSettingValue(false), 100);
  };

  const handleSaveCondolence = () => {
    console.log('TODO');
  };

  return (
    <Stack spacing={2} direction="column">
      {suggestions.map((s, index) => (
        <Box
          key={index}
          sx={{ padding: 2, border: index === selectedIdx ? '1px solid blue' : '1px solid #ccc', borderRadius: 1 }}
          onClick={() => updateSelectedIdx(index)}
        >
          <Typography>{s}</Typography>
        </Box>
      ))}
      {selectedIdx !== null && (
        <>
          {!isSettingValue ? (
            <TextField multiline rows={4} defaultValue={currentDefaultValue} />
          ) : (
            <TextField multiline rows={4} disabled />
          )}
          <Button onClick={handleSaveCondolence} variant="contained">
            Save
          </Button>
        </>
      )}
    </Stack>
  );
};
