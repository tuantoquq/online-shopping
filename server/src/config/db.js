import mongoose from 'mongoose';

const mongoDBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect to MongoDB successfully!');
    } catch (error) {
        console.debug('Error when connect to MongoDBL ', error);
    }
};

export default mongoDBConnect;
