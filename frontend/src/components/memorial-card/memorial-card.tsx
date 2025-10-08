import { Button } from '@mui/material';
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
    <div className={`profile-card ${selectedMemorialId ? 'details-view' : ''}`} key={memorial.id}>
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
          {memorial.biography.length > 160 ? memorial.biography.substring(0, 160) + '...' : memorial.biography}
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
    </div>
  );
};
