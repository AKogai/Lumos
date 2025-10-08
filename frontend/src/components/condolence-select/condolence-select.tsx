import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

export const CondolenceSelect = ({ suggestions }: { suggestions: Array<string> }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <Stack spacing={2} direction="column">
      {suggestions.map((s, index) => (
        <Box
          key={index}
          sx={{ padding: 2, border: index === selectedIdx ? '1px solid blue' : '1px solid #ccc', borderRadius: 1 }}
          onClick={() => setSelectedIdx(index)}
        >
          <Typography>{s}</Typography>
        </Box>
      ))}
    </Stack>
  );
};
