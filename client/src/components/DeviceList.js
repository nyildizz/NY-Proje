import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function DeviceList({ searchTerm }) {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get(`${API_URL}/devices`);
      setDevices(response.data.data);
    } catch (error) {
      console.error('Cihazlar yüklenirken hata oluştu:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu cihazı silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`${API_URL}/devices/${id}`);
        fetchDevices();
      } catch (error) {
        console.error('Cihaz silinirken hata oluştu:', error);
      }
    }
  };

  const handleAddReading = (id) => {
    navigate(`/device/${id}/add-reading`);
  };

  const filteredDevices = useMemo(() => {
    return devices.filter(device => 
      !searchTerm ||
      device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (device.boxNumber && device.boxNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.institutionName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [devices, searchTerm]);

  return (
    <Container maxWidth={false} sx={{ mt: 10, mb: 4, px: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary',
            mb: 1
          }}
        >
          Cihaz Listesi
        </Typography>
        {searchTerm && (
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Aranan: "{searchTerm}"
          </Typography>
        )}
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '12%' }}>Kurum</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '7%' }}>Seri No</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '7%' }}>Ks Seri No</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '8%' }}>Cihaz Sahibi</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '7%' }}>IP Adresi</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '8%' }}>Bulunduğu Birim 1</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '8%' }}>Bulunduğu Birim 2</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '7%' }}>Marka</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '7%' }}>Model</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '7%' }}>Cihaz Tipi</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '7%' }}>Cihaz Durumu</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '5%' }}>Son Sayaç</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal', width: '10%' }}>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow 
                key={device._id}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.01)' 
                  }
                }}
              >
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.institutionName}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.serialNumber}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.boxNumber || '-'}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.deviceOwner || '-'}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.ipAddress || '-'}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.unit1 || '-'}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.unit2 || '-'}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.brand}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.model}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.deviceType}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>{device.deviceStatus || 'Aktif'}</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'normal' }}>
                  {device.counterReadings && device.counterReadings.length > 0
                    ? device.counterReadings[device.counterReadings.length - 1].closingCount
                    : '-'}
                </TableCell>
                <TableCell sx={{ fontSize: '0.875rem', padding: '8px 12px', whiteSpace: 'nowrap' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon sx={{ fontSize: '0.875rem' }} />}
                    onClick={() => handleAddReading(device._id)}
                    sx={{ 
                      mr: 1,
                      py: 0.5,
                      borderColor: 'rgba(0, 0, 0, 0.12)',
                      fontSize: '0.75rem',
                      '&:hover': {
                        borderColor: 'rgba(0, 0, 0, 0.24)',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    Sayaç Ekle
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(device._id)}
                    sx={{ 
                      color: 'error.main',
                      padding: '4px',
                      '&:hover': {
                        backgroundColor: 'error.lighter'
                      }
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default DeviceList; 