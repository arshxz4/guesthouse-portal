import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const defaultForm = {
  employeeId: '',
  department: '',
  guestName: '',
  contact: '',
  designation: '',
  cost: '',
  level: '',
  modeOfTravel: '',
  comingFrom: '',
  goingBack: '',
  purpose: '',
  checkIn: '',
  checkOut: '',
  guestHouseName: '',
  roomNumber: '',
};

export default function CreateBookingDrawer({
  open,
  onClose,
  onSubmit,
  initialData,
  bookings,
  guestHouseCapacities,
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(defaultForm);
  const [availability, setAvailability] = useState(null);
  const [roomsRequested, setRoomsRequested] = useState(1);
  const [occupancy, setOccupancy] = useState('Single');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        checkIn: formatDateInput(initialData.checkIn),
        checkOut: formatDateInput(initialData.checkOut),
      });
      setStep(2);
    } else {
      setFormData(defaultForm);
      setStep(1);
    }
  }, [initialData, open]);

  const formatDateInput = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '';
  };

  const handleAvailabilityCheck = () => {
    if (!formData.guestHouseName) {
      setAlert({ open: true, message: 'Please select a guest house.', severity: 'warning' });
      return;
    }

    const booked = bookings.filter(
      (b) =>
        b.guestHouseName === formData.guestHouseName &&
        new Date(b.checkOut) >= new Date(formData.checkIn) &&
        new Date(b.checkIn) <= new Date(formData.checkOut)
    ).length;

    const total = guestHouseCapacities[formData.guestHouseName] || 0;
    const availableRooms = total - booked;

    if (roomsRequested > availableRooms) {
      setAvailability(availableRooms);
      setAlert({
        open: true,
        message: `Only ${availableRooms} rooms available.`,
        severity: 'warning',
      });
    } else {
      setAvailability(availableRooms);
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (!formData.guestName || !formData.checkIn || !formData.checkOut) {
      setAlert({ open: true, message: 'Please fill all required fields.', severity: 'error' });
      return;
    }

    const formattedData = {
      ...formData,
      guestContact: formData.contact,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
    };

    onSubmit(formattedData);
    setAlert({ open: true, message: 'Booking saved successfully!', severity: 'success' });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleCancelBooking = () => {
    setAlert({ open: true, message: 'Booking cancelled.', severity: 'info' });
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: '70vw', maxWidth: '100vw', p: 3 } }}
    >
      <Box
  display="flex"
  alignItems="center"
  justifyContent="space-between"
  sx={{
    backgroundColor: '#1976d2', // MUI primary blue
    color: 'white',
    px: 2,
    py: 1.5,
    borderRadius: 1,
    mb: 2,
  }}
>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    {initialData ? 'Edit Booking' : 'Create Booking'}
  </Typography>
  <IconButton onClick={onClose} sx={{ color: 'white' }}>
    <CloseIcon />
  </IconButton>
</Box>


      {/* Step 1: Check Availability */}
      {step === 1 && (
        <Box>
          <Typography variant="subtitle1" mb={2}>Check Room Availability</Typography>

          <TextField
            select
            label="Select Guest House"
            value={formData.guestHouseName}
            onChange={(e) => setFormData({ ...formData, guestHouseName: e.target.value })}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            {Object.keys(guestHouseCapacities).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </TextField>

          <TextField
            label="Check-In Date"
            type="date"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Check-Out Date"
            type="date"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Number of Rooms"
            type="number"
            value={roomsRequested}
            onChange={(e) => setRoomsRequested(parseInt(e.target.value))}
            fullWidth
            size="small"
            sx={{ mb: 2 }}
          />

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <Typography>Occupancy</Typography>
            <RadioGroup
              row
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
            >
              <FormControlLabel value="Single" control={<Radio />} label="Single" />
              <FormControlLabel value="Double" control={<Radio />} label="Double" />
            </RadioGroup>
          </FormControl>

          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleAvailabilityCheck}>
              Check Availability
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 2: Guest Details */}
      {step === 2 && (
  <Box component="form" autoComplete="off" mt={1}>
    {availability !== null && (
      <Typography variant="body2" sx={{ mb: 2 }}>
        Available Rooms: <strong>{availability}</strong>
      </Typography>
    )}

    <Divider sx={{ mb: 2 }} />

    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
      gap={2}
    >
      {[
        ['employeeId', 'Employee ID'],
        ['department', 'Department'],
        ['guestName', 'Guest Name'],
        ['contact', 'Contact'],
        ['designation', 'Designation'],
        ['cost', 'Cost Center'],
        ['level', 'Employee Level'],
        ['modeOfTravel', 'Mode of Travel'],
        ['comingFrom', 'Coming From'],
        ['goingBack', 'Going Back'],
        ['purpose', 'Purpose of Visit'],
        ['checkIn', 'Check-In Date', 'date'],
        ['checkOut', 'Check-Out Date', 'date'],
        ['guestHouseName', 'Guest House Name'],
        ['roomNumber', 'Room Number'],
      ].map(([key, label, type = 'text']) => (
        <TextField
          key={key}
          label={label}
          value={formData[key]}
          type={type}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          fullWidth
          size="small"
          disabled={key === 'guestHouseName'}
          InputLabelProps={type === 'date' ? { shrink: true } : undefined}
        />
      ))}
    </Box>

    <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
      {initialData && (
        <Button variant="outlined" color="error" onClick={handleCancelBooking}>
          Cancel Booking
        </Button>
      )}
      <Button variant="contained" onClick={handleSubmit}>
        {initialData ? 'Update Booking' : 'Create Booking'}
      </Button>
    </Box>
  </Box>
)}

      {/* Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={alert.severity}
          variant="filled"
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Drawer>
  );
}
