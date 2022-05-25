// Controllers
const cacheController = require('../controllers/cache');
const express = require('express');
const router = express.Router();

// Export routing
router.get('/getAllItems', cacheController.getAllItems);
router.get('/getItemByKey/:key', cacheController.getItem);
router.post('/addItem/:key', cacheController.setItem);
router.put('/updateItem/:key', cacheController.setItem);
router.delete('/removeItem/:key', cacheController.deleteItem);
router.delete('/clearItems', cacheController.clearData);

module.exports = router;
