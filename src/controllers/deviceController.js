const Device = require('../models/Device');

// Tüm cihazları getir
exports.getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: devices.length,
            data: devices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Sunucu hatası'
        });
    }
};

// Tek bir cihaz getir
exports.getDevice = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Cihaz bulunamadı'
            });
        }
        res.status(200).json({
            success: true,
            data: device
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Sunucu hatası'
        });
    }
};

// Yeni cihaz ekle
exports.createDevice = async (req, res) => {
    try {
        const device = await Device.create(req.body);
        res.status(201).json({
            success: true,
            data: device
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                error: 'Bu seri numarası zaten kullanımda'
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Sunucu hatası'
            });
        }
    }
};

// Cihaz güncelle
exports.updateDevice = async (req, res) => {
    try {
        const device = await Device.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Cihaz bulunamadı'
            });
        }
        res.status(200).json({
            success: true,
            data: device
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Sunucu hatası'
        });
    }
};

// Cihaz sil
exports.deleteDevice = async (req, res) => {
    try {
        const device = await Device.findByIdAndDelete(req.params.id);
        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Cihaz bulunamadı'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Sunucu hatası'
        });
    }
};

// Sayaç okuması ekle
exports.addCounterReading = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) {
            return res.status(404).json({
                success: false,
                error: 'Cihaz bulunamadı'
            });
        }

        device.counterReadings.push(req.body);
        await device.save();

        res.status(200).json({
            success: true,
            data: device
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Sunucu hatası'
        });
    }
}; 