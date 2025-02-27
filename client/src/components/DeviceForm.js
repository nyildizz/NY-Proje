import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function DeviceForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    serialNumber: '',
    boxNumber: '',
    deviceOwner: '',
    ipAddress: '',
    unit1: '',
    unit2: '',
    brand: '',
    model: '',
    deviceType: '',
    deviceStatus: 'Aktif',
    institutionName: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Gönderilen veri:', formData);
      console.log('API URL:', `${API_URL}/devices`);
      
      const response = await axios.post(`${API_URL}/devices`, formData);
      console.log('API yanıtı:', response.data);
      
      navigate('/');
    } catch (error) {
      console.error('Cihaz eklenirken hata oluştu:', error);
      console.error('Hata detayı:', error.response?.data);
      
      setError(
        error.response?.data?.error || 
        'Cihaz eklenirken bir hata oluştu. Lütfen tekrar deneyin.'
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Yeni Cihaz Ekle
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Seri Numarası"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Kasa Seri Numarası"
            name="boxNumber"
            value={formData.boxNumber}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Cihaz Sahibi"
            name="deviceOwner"
            value={formData.deviceOwner}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="IP Adresi"
            name="ipAddress"
            value={formData.ipAddress}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bulunduğu Birim 1"
            name="unit1"
            value={formData.unit1}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bulunduğu Birim 2"
            name="unit2"
            value={formData.unit2}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Marka"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Cihaz Tipi"
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Cihaz Durumu"
            name="deviceStatus"
            value={formData.deviceStatus}
            onChange={handleChange}
            margin="normal"
            defaultValue="Aktif"
          />
          <TextField
            fullWidth
            label="Kurum Adı"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            required
            margin="normal"
          />
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Cihaz Ekle
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
      >
        <Alert 
          onClose={() => setError('')} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DeviceForm; 