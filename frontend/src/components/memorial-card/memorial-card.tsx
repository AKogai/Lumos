import { Box, Button, Divider, Typography } from '@mui/material';
import { MemorialCaseResponse } from '../../api/funeral-cases';

export const MemorialCard = ({
  memorial,
  handleWriteCondolence,
  openMemorialDetails,
  selectedMemorialId
}: {
  memorial: MemorialCaseResponse;
  handleWriteCondolence?: () => void;
  openMemorialDetails?: (memorial: MemorialCaseResponse) => void;
  selectedMemorialId?: string;
}) => {
  return (
    <Box
      key={memorial.id}
      sx={(theme) => ({
        backgroundColor: 'white',
        borderRadius: theme.spacing(1.5),
        boxShadow: theme.shadows[3],
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: !selectedMemorialId ? 'translateY(-4px)' : ''
        }
      })}
    >
      <img
        src={
          memorial.profileImageUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(memorial.firstName + ' ' + memorial.lastName)}&background=random`
        }
        alt={`${memorial.firstName} ${memorial.lastName}`}
      />
      <div className="profile-content">
        <h3>
          {memorial.firstName} {memorial.middleName ? memorial.middleName + ' ' : ''}
          {memorial.lastName}
        </h3>
        <p className="lifespan">
          {memorial.bornDate} – {memorial.deathDate}
        </p>
        <p className="bio">
          {!selectedMemorialId && memorial.biography.length > 160
            ? memorial.biography.substring(0, 160) + '...'
            : memorial.biography}
        </p>
        <p className="location">
          {memorial.placeOfBirth} → {memorial.placeOfDeath}
        </p>
        <Button
          sx={{ mt: 2 }}
          onClick={() => (selectedMemorialId ? handleWriteCondolence() : openMemorialDetails(memorial))}
        >
          {selectedMemorialId ? 'Write condolence →' : 'View details'}
        </Button>
      </div>
      {selectedMemorialId && memorial.condolences.length > 0 && (
        <>
          <Divider />
          <Box>
            {memorial.condolences.map((cd, idx) => (
              <Typography key={idx}>"{cd.message}"</Typography>
            ))}
          </Box>
        </>
      )}
      <Divider />
    </Box>
  );
};
