import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import GuestHouseStatsCard from './GuestHouseStatsCard';
import BookingTable from './BookingTable';
import CreateBookingDrawer from './CreateBookingDrawer';

const guestHouseCapacities = {
  'Ambav Garh': 5,
  'HDM Guest House': 2,
  'Demo Guest House 1': 5,
};

const initialBookings = [
  {
    id: 1,
    guestName: 'Sourmik Baithalu',
    guestContact: '341324234',
    checkIn: '2025-05-27',
    checkOut: '2025-05-27',
    guestHouseName: 'Demo Guest House 1',
    roomNumber: '1',
  },
  {
    id: 2,
    guestName: 'Test',
    guestContact: '7656767692',
    checkIn: '2024-10-18',
    checkOut: '2024-10-21',
    guestHouseName: 'Ambav Garh',
    roomNumber: '1',
  },
];

export default function RoomBookingPortal() {
  const [bookings, setBookings] = useState(initialBookings);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddBooking = (data) => {
    if (selectedBooking) {
      setBookings((prev) =>
        prev.map((b) => (b.id === selectedBooking.id ? { ...data, id: b.id } : b))
      );
    } else {
      const newBooking = { ...data, id: Date.now() };
      setBookings((prev) => [...prev, newBooking]);
    }
    setSelectedBooking(null);
  };

  const handleUpdateBooking = (updatedRow) => {
    setBookings((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setDrawerOpen(true);
  };

  const handleDelete = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      b.guestName.toLowerCase().includes(term) ||
      b.guestContact?.toLowerCase().includes(term) ||
      b.guestHouseName.toLowerCase().includes(term)
    );
  });

  return (
    <Box className="p-6 space-y-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold">Room Booking Portal</h1>

      {/*  Guest House Stats */}
      <div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  }}
>
  {Object.entries(guestHouseCapacities).map(([name, total]) => {
    const booked = bookings.filter((b) => b.guestHouseName === name).length;
    return (
      <GuestHouseStatsCard
        key={name}
        title={name}
        total={total}
        booked={booked}
        available={total - booked}
      />
    );
  })}
</div>


      {/* Search + Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <TextField
          variant="outlined"
          label="Search by Guest Name, Contact, or Guest House"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2"
        />
        <div className="flex gap-2">
          <Button variant="contained" onClick={() => setDrawerOpen(true)}>
            + Create Booking
          </Button>
          <Button variant="contained" color="primary">
            Go to Guest House Main Page
          </Button>
        </div>
      </div>

      {/*  Booking Table */}
      <BookingTable
        bookings={filteredBookings}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdate={handleUpdateBooking}
      />

      {/*  Booking Drawer */}
      <CreateBookingDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedBooking(null);
        }}
        onSubmit={handleAddBooking}
        initialData={selectedBooking}
        bookings={bookings}
        guestHouseCapacities={guestHouseCapacities}
      />
    </Box>
  );
}
