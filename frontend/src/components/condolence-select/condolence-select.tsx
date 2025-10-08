import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

export const CondolenceSelect = ({
  suggestions,
  onAfterSave
}: {
  suggestions: Array<string>;
  onAfterSave: (selectedCondolence: string) => void;
}) => {
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
    onAfterSave(suggestions[selectedIdx]);
  };

  return (
    <Stack spacing={2} direction="column">
      {suggestions.map((s, index) => (
        <Box
          key={index}
          sx={(theme) => ({
            padding: 2,
            border: '1px solid',
            borderColor: index === selectedIdx ? theme.palette.primary.main : '#ccc',
            borderRadius: 1
          })}
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
