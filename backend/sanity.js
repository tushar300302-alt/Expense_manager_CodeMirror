console.log('Hello world');
try {
    const mongoose = require('mongoose');
    console.log('Mongoose version:', mongoose.version);
} catch (e) {
    console.error('Mongoose failed:', e.message);
}
