// Libraries
import mongoose from 'mongoose';
// Config
import { dbURL } from './config';

//mongoose.set('debug', true);

export const dbConnection = () => {
  return mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}
