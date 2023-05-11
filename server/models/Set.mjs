import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const setSchema = new Schema({
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
		required: false,
	},
});

const Set = model('Set', setSchema);
export default Set;
