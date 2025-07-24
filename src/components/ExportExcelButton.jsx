import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ExportExcelButton = ({ data, filename = 'GuestHouses.xlsx' }) => {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Guest Houses');
    XLSX.writeFile(workbook, filename);
  };

  return (
    <Button
    variant="contained"
      onClick={handleExport}
      startIcon={<FileDownloadIcon />}
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
      Export to Excel
    </Button>
  );
};

export default ExportExcelButton;
