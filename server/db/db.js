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

export default mongoose.connection;
