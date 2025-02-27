const express = require('express');
const router = express.Router();
const {
    getAllDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    addCounterReading
} = require('../controllers/deviceController');

// Ana cihaz route'ları
router.route('/')
    .get(getAllDevices)
    .post(createDevice);

// Tekil cihaz route'ları
router.route('/:id')
    .get(getDevice)
    .put(updateDevice)
    .delete(deleteDevice);

// Sayaç okuması route'u
router.route('/:id/counter-reading')
    .post(addCounterReading);

module.exports = router; 