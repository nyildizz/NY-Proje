const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('MongoDB bağlantısı başlatılıyor...');
        console.log('Bağlantı URI:', process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('MongoDB bağlantısı başarılı');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error.message);
        console.error('Tam hata:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 