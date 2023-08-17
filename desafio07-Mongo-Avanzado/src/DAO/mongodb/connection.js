import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://sdario66:LGvgvI5bFHzXH3HT@cluster0.vanew69.mongodb.net/ecommerce?retryWrites=true&w=majority';

try {
    await mongoose.connect(connectionString)
    mongoose.set('debug', false);
    console.log('Conectado a MongoDB!');
} catch (error) {
    console.log(error);
}