import mongoose from 'mongoose';

mongoose.connect(process.env.ATLAS_URI);
const db = mongoose.connection 

db.on('error', (error) => console.error(error))

db.once('open', () => console.log('Connected to Database'))