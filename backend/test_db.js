const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('✓ MongoDB connected successfully');

        // Try to list collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('✓ Collections:', collections.map(c => c.name));

        // Try to create a test document
        const TestSchema = new mongoose.Schema({ test: String });
        const TestModel = mongoose.model('Test', TestSchema);

        const doc = await TestModel.create({ test: 'Hello' });
        console.log('✓ Created test document:', doc);

        await TestModel.deleteOne({ _id: doc._id });
        console.log('✓ Deleted test document');

        process.exit(0);
    })
    .catch(err => {
        console.error('✗ MongoDB connection error:', err);
        process.exit(1);
    });

// Set a timeout
setTimeout(() => {
    console.error('✗ Operation timed out after 15 seconds');
    process.exit(1);
}, 15000);
