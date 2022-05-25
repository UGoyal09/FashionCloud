const HttpStatus = require('http-status-codes');
const logger = require('../config/logger');
const { Cache } = require('../models/index');
const checkExpiry = require('../helpers/checkExpiry');
const generateRandomString = require('../helpers/generateRandomStrings');
/**
 * GET /cache
 * Add a item in the cached
 */
exports.getAllItems = (req, res, next) => {
  Cache.find({})
    .then((items) => {
      res.status(HttpStatus.OK).json(items);
    }).catch(err => next(err));
};

/**
 * GET /cache/:key
 * get cached item
 */
exports.getItem = (req, res, next) => {
  const { key, } = req.params;
  if(!key)
  {
      return res.status(HttpStatus.BAD_REQUEST).json({message:"Please enter the value of key"})
  }
  Cache.findOne({ key, })
    .then((cachedItem) => {
      if (cachedItem) {
        logger.info('Cache hit');

        // Generate a random value if item is expired
        if (checkExpiry.isItemExpired(cachedItem.expires)) {
          cachedItem.value = generateRandomString.generateRandomString();
        }

        // Silently save (also Implicitly resets the expiry - see 'save' hook)
        cachedItem.save();

        return res.status(HttpStatus.OK).json(cachedItem);
      }

      logger.info('Cache miss');
      const value = generateRandomString.generateRandomString();

      const cache = new Cache({
        key,
        value,
      });

      cache.save()
        .then(() => res.status(HttpStatus.CREATED).json(cache)).catch(err => next(err));
    }).catch(err => next(err));
};

/**
 * POST /cache/:key { value }
 * Add a item in the cached
 */
exports.setItem = (req, res, next) => {
  req.assert('value', 'Error - value - cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    logger.error(errors);

    res.status(HttpStatus.BAD_REQUEST).json(errors);
  }

  const { key, } = req.params;
  const { value, ttl, } = req.body;

  Cache.findOne({ key, })
    .then((cachedItem) => {
      if (cachedItem) {
        cachedItem.value = value;
        cachedItem.save();

        res.status(HttpStatus.OK).json(cachedItem);
      } else {
        const cache = new Cache({
          key,
          value,
          ttl,
        });

        cache.save()
          .then(() => {
            res.json(cache);
          }).catch(err => next(err));
      }
    }).catch(err => next(err));
};

/**
 * DELETE /cache/:key
 * Delete an item from the cache
 */
 exports.deleteItem = (req, res, next) => {
  const { key, } = req.params;

  Cache.deleteOne({ key, })
    .then((deleted) => {
    if(deleted.deletedCount == 1){
      res.status(HttpStatus.OK).send("Successfully deleted item");
    }else{
        res.status(HttpStatus.EXPECTATION_FAILED).send("Item Not deleted");
    }
    }).catch(err => next(err));
};

/**
 * DELETE /cache
 * Clean all items from the cache
 */
 exports.clearData = (req, res, next) => {
  Cache.remove({})
    .then(() => {
      res.status(HttpStatus.OK).send("Succesfully deleted");
    }).catch(err => next(err));
};