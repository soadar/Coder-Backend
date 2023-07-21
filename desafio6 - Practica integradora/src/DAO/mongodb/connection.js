import mongoose from 'mongoose';

// const connectionString = 'mongodb://localhost:27017/coderhouse';
const connectionString = 'mongodb+srv://sdario66:LGvgvI5bFHzXH3HT@cluster0.vanew69.mongodb.net/ecommerce?retryWrites=true&w=majority';

// export const initMongoDB = async () => {
try {
    await mongoose.connect(connectionString)
    console.log('Conectado a MongoDB!');
} catch (error) {
    console.log(error);
}
// }