//module is in strict mode by default ;)
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    return await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME || 'wave',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error('Connection to db failed: ', e);
  }
})();

const db = mongoose.connection;

const handleOpen = () => console.log('Connected to DB!');
const handleError = (err) => console.log('db error', err);

db.on('error', handleError);
db.once('open', handleOpen);
