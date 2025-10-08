import { Box, Button, Divider, Typography } from '@mui/material';
import { MemorialCaseResponse } from '../../api/funeral-cases';
import { useEffect, useState } from 'react';

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
        style={{
          width: '100%',
          height: '220px',
          objectFit: 'cover'
        }}
        src={
          memorial.profileImageUrl ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(memorial.firstName + ' ' + memorial.lastName)}&background=random`
        }
        alt={`${memorial.firstName} ${memorial.lastName}`}
      />
      <Box
        sx={(theme) => ({
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        })}
      >
        <Typography sx={(theme) => ({ marginBottom: theme.spacing(0.5) })} variant="h4">
          {memorial.firstName} {memorial.middleName ? memorial.middleName + ' ' : ''}
          {memorial.lastName}
        </Typography>
        <Typography sx={(theme) => ({ marginBottom: theme.spacing(2), color: 'gray', flexGrow: 1 })}>
          {!selectedMemorialId && memorial.biography.length > 160
            ? memorial.biography.substring(0, 160) + '...'
            : memorial.biography}
        </Typography>
        <Typography sx={(theme) => ({ marginBottom: theme.spacing(0.25), color: 'gray' })}>
          {memorial.bornDate} – {memorial.deathDate}
        </Typography>
        <Typography sx={(theme) => ({ marginBottom: theme.spacing(1), color: 'gray' })}>
          {memorial.placeOfBirth} → {memorial.placeOfDeath}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => (selectedMemorialId ? handleWriteCondolence() : openMemorialDetails(memorial))}
        >
          <Typography fontWeight="500">{selectedMemorialId ? 'Write condolence →' : 'View details'}</Typography>
        </Button>
      </Box>
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
