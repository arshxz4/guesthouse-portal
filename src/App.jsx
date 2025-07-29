import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoomBookingPortal from './components/RoomBookingPortal'; // Adjust path if needed

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/room-booking" />} />
          <Route path="/room-booking" element={<RoomBookingPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
