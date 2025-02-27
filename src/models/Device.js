const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: [true, 'Seri numarası zorunludur'],
        unique: true,
        trim: true
    },
    boxNumber: {
        type: String,
        trim: true
    },
    deviceOwner: {
        type: String,
        trim: true
    },
    ipAddress: {
        type: String,
        trim: true
    },
    unit1: {
        type: String,
        trim: true
    },
    unit2: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Marka bilgisi zorunludur'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'Model bilgisi zorunludur'],
        trim: true
    },
    deviceType: {
        type: String,
        required: [true, 'Cihaz tipi zorunludur'],
        trim: true
    },
    deviceStatus: {
        type: String,
        default: 'Aktif',
        trim: true
    },
    institutionName: {
        type: String,
        required: [true, 'Kurum adı zorunludur'],
        trim: true
    },
    counterReadings: [{
        openingCount: {
            type: Number,
            required: [true, 'Açılış sayacı zorunludur']
        },
        closingCount: {
            type: Number,
            required: [true, 'Kapanış sayacı zorunludur']
        },
        difference: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Sayaç farkını otomatik hesaplama
deviceSchema.pre('save', function(next) {
    if (this.counterReadings && this.counterReadings.length > 0) {
        this.counterReadings = this.counterReadings.map(reading => {
            reading.difference = reading.closingCount - reading.openingCount;
            return reading;
        });
    }
    this.updatedAt = Date.now();
    next();
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device; 