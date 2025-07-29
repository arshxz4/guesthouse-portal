import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HotelIcon from '@mui/icons-material/Hotel';

export default function GuestHouseStatsCard({ title, total, booked, available }) {
  return (
    <Card
      elevation={3}
      sx={{
        minWidth: 260,
        borderRadius: 3,
        background: '#fff',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {title}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <MeetingRoomIcon color="primary" />
          <Typography variant="body1" fontWeight={600}>
            Total Rooms:
          </Typography>
          <Chip label={total} color="primary" size="small" />
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <HotelIcon color="error" />
          <Typography variant="body1" fontWeight={600}>
            Booked:
          </Typography>
          <Chip label={booked} color="error" size="small" />
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <EventAvailableIcon color="success" />
          <Typography variant="body1" fontWeight={600}>
            Available:
          </Typography>
          <Chip label={available} color="success" size="small" />
        </Box>
      </CardContent>
    </Card>
  );
}
