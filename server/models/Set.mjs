import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const setSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const Set = model('Set', setSchema);
export default Set;
