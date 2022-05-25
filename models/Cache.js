const mongoose = require('mongoose');
const config = require('../config');
const checkExpiry = require('../helpers/checkExpiry');
const logger = require('../config/logger') 

const cacheSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String,
  ttl: { type: Number, default: config.DEFAULT_TTL },
  expires: { type: Number, default: checkExpiry.getExpiryTimestamp(config.DEFAULT_TTL) },
}, { timestamps: true });

/**
 * Check that the maximum is not exceeded before saving
 */
cacheSchema.pre('save', function save(next) {
  const item = this;

  // Set the expiry     
  if (item.ttl) item.expires = checkExpiry.getExpiryTimestamp(item.ttl);

  // Check for limit if the item is new
  if (item.isNew) {
    Cache.countDocuments()
      .then((numberOfItems) => {
        if (numberOfItems >= config.CACHE_LIMIT) {
            logger.info('Maximum exceeded, removing oldest item...');

          // Delete the oldest item
          Cache.findOne({}, {}, { sort: { created_at: 1 } })
            .then((hit) => {
              hit
                .remove()
                .then(() => next());
            });
        } else next();
      });
  } else next();
});

const Cache = mongoose.model('Cache', cacheSchema);
module.exports = Cache;