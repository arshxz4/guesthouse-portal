import React from 'react';
import GuestHouseTable from './components/GuestHouseTable';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">

      {/* Background Particles */}
      

      {/* Foreground Content */}
      <div className="relative z-10 p-6  text-white">
        

        <GuestHouseTable />
      </div>
    </div>
  );
}

export default App;
