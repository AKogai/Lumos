import { Stack } from '@mui/material';
import { MemorialCard } from '../memorial-card/memorial-card';

export const MemorialDetails = ({ selectedProfile, handleWriteCondolence }) => {
  return (
    <Stack spacing={2} direction="column">
      <MemorialCard
        memorial={selectedProfile}
        selectedMemorialId={selectedProfile.id}
        handleWriteCondolence={handleWriteCondolence}
      />
    </Stack>
  );
};
