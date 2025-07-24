import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
  Slider,
  Input,
  Snackbar,
  Alert,
  tableBodyClasses,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';

export default function GuestHouseFormModal({ isOpen, onRequestClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    caretaker: '',
    mobile: '',
    facilities: [],
    rooms: 0,
  });

  const [roomDetails, setRoomDetails] = useState([]);

  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success', // 'error' | 'warning' | 'info'
  });

  const facilityOptions = [
    'Wi-Fi',
    'AC',
    'TV',
    'Refrigerator',
    'Laundry',
    'Parking',
    'Kettle',
    'Hairdryer',
    'Iron',
  ];

  // Sync roomDetails with number of rooms
  useEffect(() => {
    const currentCount = roomDetails.length;
    const desiredCount = formData.rooms;

    if (desiredCount > currentCount) {
      const additionalRows = Array.from({ length: desiredCount - currentCount }, (_, i) => ({
        id: Date.now() + i,
        roomNumber: '',
        occupancy: '',
      }));
      setRoomDetails((prev) => [...prev, ...additionalRows]);
    } else if (desiredCount < currentCount) {
      setRoomDetails((prev) => prev.slice(0, desiredCount));
    }
  }, [formData.rooms]);

  // Load initial data
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        facilities: Array.isArray(initialData.facilities)
          ? initialData.facilities
          : initialData.facilities.split(',').map((f) => f.trim()),
      });
      setRoomDetails(initialData.roomDetails || []);
    } else {
      setFormData({
        name: '',
        address: '',
        caretaker: '',
        mobile: '',
        facilities: [],
        rooms: 0,
      });
      setRoomDetails([]);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleAddRoom = () => {
  setRoomDetails((prev) => [
    ...prev,
    {
      id: Date.now(),
      roomNumber: '',
      occupancy: '',
    },
  ]);
};


  const handleRoomChange = (id, key, value) => {
    setRoomDetails((prev) =>
      prev.map((room) => (room.id === id ? { ...room, [key]: value } : room))
    );
  };

  const handleRemoveRoom = (id) => {
    setRoomDetails((prev) => prev.filter((room) => room.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      setAlert({
        open: true,
        message: 'Mobile number must be exactly 10 digits.',
        severity: 'error',
      });
      return;
    }

    onSave({ ...formData, roomDetails });

    setAlert({
      open: true,
      message: 'Guest House saved successfully!',
      severity: 'success',
    });

    // Optionally delay modal close after alert
    setTimeout(() => {
      onRequestClose();
    }, 1500);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onRequestClose}
      PaperProps={{
        sx: { width: 500, p: 3, bgcolor: '#f3ffd0ff', color: 'black' },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Guest House Form</Typography>
        <IconButton onClick={onRequestClose} sx={{ color: 'black' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <Stack spacing={2}>
          <TextField
            fullWidth
            size ="small"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { color: 'black' } }}
          />

          <TextField
            fullWidth
            size ="small"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { color: 'black' } }}
          />

          <TextField
            fullWidth
            size ="small"
            name="caretaker"
            label="Caretaker Name"
            value={formData.caretaker}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { color: 'black' } }}
          />

          <TextField
            fullWidth
            size ="small"
            name="mobile"
            label="Mobile"
            value={formData.mobile}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setFormData((prev) => ({ ...prev, mobile: value }));
              }
            }}
            variant="outlined"
            inputProps={{
              maxLength: 10,
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { color: 'black' } }}
          />

          <Autocomplete
          size ="small"
            multiple
            freeSolo
            disableCloseOnSelect
            options={facilityOptions}
            value={formData.facilities}
            onChange={(e, newValue) =>
              setFormData((prev) => ({ ...prev, facilities: newValue }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Facilities"
                placeholder="Select or type"
              />
            )}
          />

          <Box sx={{ width: 300 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography>No. of Rooms</Typography>
              <Input
                value={formData.rooms}
                size="small"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 100) {
                    setFormData((prev) => ({ ...prev, rooms: value }));
                  }
                }}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: 'number',
                }}
                disableUnderline
                sx={{ width: 60, ml: 2, '& input': { textAlign: 'center', padding: '4px' } }}
              />
            </Box>
            <Slider
              value={formData.rooms}
              onChange={(e, newValue) =>
                setFormData((prev) => ({ ...prev, rooms: newValue }))
              }
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>

          {/* Room Details Heading and Add Button in a Row */}
          <Box display="flex" alignItems="center" gap={2} mt={2} mb={1}>
            <Typography variant="h6" fontWeight="bold">
              Room Details
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={handleAddRoom}
              sx={{
                backgroundColor: '#16a34a',
                textTransform: 'none',
                width: 'fit-content',
                mb: 0, // Remove margin bottom
              }}
            >
              + Add Room Details
            </Button>
          </Box>

          {roomDetails.length === 0 ? (
            <Typography variant="body2">No rooms added yet.</Typography>
          ) : (
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 2,
                mb: 2,
                maxHeight: 250,
                overflowY: 'auto',
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                fontWeight="bold"
                sx={{ color: 'gray.700', mb: 1 }}
                gap={2}
              >
                <Box sx={{ width: '33%' }}>Room Number</Box>
                <Box sx={{ width: '33%' }}>Occupancy</Box>
                <Box sx={{ width: '33%' }}>Action</Box>
              </Box>

              {roomDetails.map((room) => (
                <Box key={room.id} display="flex" alignItems="center" gap={2} mb={1}>
                  <TextField
                    size="small"
                    value={room.roomNumber}
                    onChange={(e) =>
                      handleRoomChange(room.id, 'roomNumber', e.target.value)
                    }
                    sx={{ width: '33%' }}
                  />
                  <TextField
                    size="small"
                    value={room.occupancy}
                    onChange={(e) =>
                      handleRoomChange(room.id, 'occupancy', e.target.value)
                    }
                    sx={{ width: '33%' }}
                  />
                  <Box sx={{ width: '33%' }}>
                    <Button
                      onClick={() => handleRemoveRoom(room.id)}
                      size="small"
                      color="error"
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" color="inherit" onClick={onRequestClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={(event, reason) => {
          if (reason === 'timeout' && alert.severity === 'success') {
            onRequestClose();
          }
          setAlert({ ...alert, open: false });
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={alert.severity}
          variant="filled"
          onClose={() => setAlert({ ...alert, open: false })}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Drawer>
  );
}
