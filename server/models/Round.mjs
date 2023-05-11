import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const roundSchema = new Schema({
	num: {
		type: Number,
		required: true,
	},
	reps: [
        {
		    type: SchemaTypes.ObjectId,
            ref: 'Rep',
            required: true,
        }
	],
    description: {
        type: String,
        required: false,
    },
});

const Round = model('Round', roundSchema);
export default Round;
