import React, { useState } from 'react';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import GuestHouseFormModal from './GuestHouseFormModal';
import ExportExcelButton from './ExportExcelButton';

const initialData = [
  {
    name: 'Master Guest House',
    address: 'Plot No. 12, Sector 45, Noida, Uttar Pradesh - 201301',
    caretaker: 'Mr. Ramesh Sharma',
    mobile: '9810234567',
    facilities: 'Wi-Fi, Refrigerator, Laundry, Kettle, Iron, Hairdryer',
    rooms: 5,
  },
  {
    name: 'Green Leaf Guest House',
    address: '18/3, M.G. Road, Indiranagar, Bengaluru, Karnataka - 560038',
    caretaker: 'Mrs. Sunita Iyer',
    mobile: '9341234560',
    facilities: 'Wi-Fi, Lift, Refrigerator',
    rooms: 5,
  },
  {
    name: 'Palm Residency',
    address: 'C-204, Lajpat Nagar II, New Delhi - 110024',
    caretaker: 'Mr. Rajesh Verma',
    mobile: '8826754321',
    facilities: 'Wi-Fi, Lift, Refrigerator',
    rooms: 5,
  },
  {
    name: 'Sunrise Stay Guest House',
    address: '7/22, Anna Nagar East, Chennai, Tamil Nadu - 600102',
    caretaker: 'Ms. Kavitha R.',
    mobile: '9003056789',
    facilities: 'Wi-Fi, Lift, Refrigerator',
    rooms: 5,
  },
];

export default function GuestHouseTable() {
  const [guestHouses, setGuestHouses] = useState(initialData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editData) {
      setGuestHouses((prev) =>
        prev.map((gh) => (gh.name === editData.name ? data : gh))
      );
    } else {
      setGuestHouses((prev) => [...prev, data]);
    }
  };

  // Generate unique IDs using array index
  const rows = guestHouses
    .filter((row) => {
      const search = searchTerm.toLowerCase();
      return (
        row.name.toLowerCase().includes(search) ||
        row.address.toLowerCase().includes(search) ||
        row.caretaker.toLowerCase().includes(search)
      );
    })
    .map((row, index) => ({ id: index, ...row }));

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleEdit(params.row)}
          variant="text"
          size="small"
        >
          ✏
        </Button>
      ),
    },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'caretaker', headerName: 'Caretaker', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'facilities', headerName: 'Facilities', width: 250 },
    { field: 'rooms', headerName: 'Rooms', width: 100, type: 'number' },
  ];

  return (
    <div className="p-6 bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Guest House Management</h2>

      {/* Search and Buttons */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by name, address, or caretaker..."
          className="p-3 w-full md:w-1/2 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-row gap-2">
          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{
              backgroundColor: '#111',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: 2,
              textTransform: 'none',
              paddingX: 3,
              paddingY: 1.2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              '&:hover': {
                backgroundColor: '#222',
              },
            }}
          >
            + Add Guest House
          </Button>

          <ExportExcelButton data={guestHouses} />
        </div>
      </div>

      {/* MUI DataGrid */}
      <div style={{ height: 500, width: '100%' }} className="bg-white rounded-xl shadow-lg border border-gray-200">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          sx={{
            fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#ffffff', // white
    borderRadius: '12px',
    border: '1px solid #e5e7eb', // Tailwind gray-200

    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#f3f4f6', // gray-100
      color: '#374151', // gray-700
      fontWeight: '600',
      fontSize: '0.875rem',
      borderBottom: '1px solid #e5e7eb',
    },

    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: '600',
    },

    '& .MuiDataGrid-cell': {
      color: '#1f2937', // gray-800
      fontSize: '0.875rem',
      borderBottom: '1px solid #f3f4f6',
    },

    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#fefce8', // yellow-50 hover
    },

    '& .MuiDataGrid-footerContainer': {
      backgroundColor: '#f9fafb', // gray-50
      borderTop: '1px solid #e5e7eb',
      color: '#4b5563', // gray-600
      fontSize: '0.875rem',
    },

    '& .MuiTablePagination-root': {
      fontSize: '0.875rem',
    },

    '& .MuiDataGrid-selectedRowCount': {
      visibility: 'hidden',},
          }}
        />
      </div>

      {/* Modal */}
      <GuestHouseFormModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editData}
      />
    </div>
  );
}
