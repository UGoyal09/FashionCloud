// Controllers
const cacheController = require('../controllers/cache');
const express = require('express');
const router = express.Router();

// Export routing
router.get('/getAllItems', cacheController.getAllItems);// it will get all the caches from database
router.get('/getItemByKey/:key', cacheController.getItem);// get item if key matches otherwise string
router.post('/addAndUpdateItem/:key', cacheController.setItem);//will update as well create the cache
// router.put('/updateItem/:key', cacheController.setItem);
router.delete('/removeItem/:key', cacheController.deleteItem);// delete item which matches with key
router.delete('/clearItems', cacheController.clearData);// removes all data from the database

module.exports = router;
