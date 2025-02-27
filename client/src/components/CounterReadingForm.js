import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function CounterReadingForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    openingCount: '',
    closingCount: '',
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
      await axios.post(
        `${API_URL}/devices/${id}/counter-reading`,
        {
          openingCount: parseInt(formData.openingCount),
          closingCount: parseInt(formData.closingCount),
        }
      );
      navigate('/');
    } catch (error) {
      console.error('Sayaç okuması eklenirken hata oluştu:', error);
      alert('Sayaç okuması eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Yeni Sayaç Okuması Ekle
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Açılış Sayacı"
            name="openingCount"
            type="number"
            value={formData.openingCount}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Kapanış Sayacı"
            name="closingCount"
            type="number"
            value={formData.closingCount}
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
              Sayaç Okuması Ekle
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CounterReadingForm; 