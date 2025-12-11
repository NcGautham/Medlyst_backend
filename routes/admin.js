const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/doctors', adminController.createDoctor);
router.post('/slots', adminController.createSlot);
router.get('/slots', adminController.listAllSlots);
router.delete('/doctors/:id', adminController.deleteDoctor);

module.exports = router;

