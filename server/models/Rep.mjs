import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const repSchema = new Schema({
	num: {
		type: Number,
		required: true,
	},
	dist: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	intervals: [
		{
			type: String,
			required: true,
		},
	],
});

const Rep = model('Rep', repSchema);
export default Rep;
