const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const deviceRoutes = require('./routes/deviceRoutes');

// Express uygulamasını oluştur
const app = express();

// CORS ayarları
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware'leri ekle
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// MongoDB'ye bağlan
connectDB();

// Route'ları ekle
app.use('/api/devices', deviceRoutes);

// Ana route
app.get('/', (req, res) => {
    res.json({ message: 'MongoDB Atlas API çalışıyor' });
});

// Port ayarı
const PORT = process.env.PORT || 5000;

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
    console.log(`Ana sayfa: http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/devices`);
});

// Hata yakalama
process.on('unhandledRejection', (err) => {
    console.log('Yakalanmamış Hata:', err.message);
    console.log('Tam hata:', err);
}); 