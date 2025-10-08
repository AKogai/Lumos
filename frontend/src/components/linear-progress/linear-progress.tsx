import { Box, Typography, LinearProgressProps, LinearProgress as MuiLinearProgress } from '@mui/material';

export function LinearProgress(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <MuiLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
