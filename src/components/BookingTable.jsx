import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';

export default function BookingTable({ bookings, onEdit, onDelete, onUpdate }) {
  console.log('bookings:', bookings);

  const columns = [
    { field: 'guestName', headerName: 'Guest Name', flex: 1, editable: true },
    { field: 'guestContact', headerName: 'Contact Details', flex: 1, editable: true },
    {
      field: 'checkIn',
      headerName: 'Check In',
      flex: 1,
      editable: true,
    },
    {
      field: 'checkOut',
      headerName: 'Check Out',
      flex: 1,
      editable: true,
    },
    { field: 'guestHouseName', headerName: 'Guest House Name', flex:   1, editable: true },
    { field: 'roomNumber', headerName: 'Room Number', flex: 1, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<Edit />} label="Edit" onClick={() => onEdit(params.row)} />,
        <GridActionsCellItem icon={<Delete />} label="Delete" onClick={() => onDelete(params.row.id)} showInMenu />,
      ],
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={bookings}
        columns={columns}
        disableSelectionOnClick
        editMode="row"
        processRowUpdate={(newRow) => {
          onUpdate(newRow);
          return newRow;
        }}
        onProcessRowUpdateError={(error) => console.error('Update error:', error)}
        pageSize={5}

        
      />
    </div>
  );
}
