
// To generate expiry timestamp
exports.getExpiryTimestamp = ttl => Date.now() + ttl;

// To check the cache is expired or not
exports.isItemExpired = expiryDate => expiryDate < Date.now();