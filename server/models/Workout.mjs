import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const workoutSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	subsets: [
		{
			type: SchemaTypes.ObjectId,
			ref: 'Round',
			required: true,
		},
	],
	description: {
		type: String,
		required: true,
	},
});

const Workout = model('Workout', workoutSchema);
export default Workout;
