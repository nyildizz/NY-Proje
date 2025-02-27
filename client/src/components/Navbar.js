import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Navbar = ({ searchTerm, onSearchChange }) => {
  const handleSearch = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <AppBar position="fixed" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Title on the left */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Numaratör Takip Sistemi
        </Typography>

        {/* Search and buttons on the right */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'background.paper', borderRadius: 1, px: 2 }}>
            <TextField
              size="small"
              placeholder="Seri no ile ara"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                },
              }}
            />
            <SearchIcon color="action" />
          </Box>

          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ bgcolor: 'background.paper', color: 'primary.main', '&:hover': { bgcolor: 'background.paper', opacity: 0.9 } }}
          >
            Cihazlar
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/add-device"
            sx={{ bgcolor: 'background.paper', color: 'primary.main', '&:hover': { bgcolor: 'background.paper', opacity: 0.9 } }}
          >
            Yeni Cihaz Ekle
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 