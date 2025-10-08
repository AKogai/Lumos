export const MemorialCard = ({ memorial, handleWriteCondolence }) => {
  return (
    <div className="profile-card" key={memorial.id}>
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
        <button type="button" className="read-more" onClick={() => handleWriteCondolence(memorial)}>
          Write condolence →
        </button>
      </div>
    </div>
  );
};
