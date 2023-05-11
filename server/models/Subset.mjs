import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const subsetSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	rounds: [
        {
		    type: SchemaTypes.ObjectId,
            ref: 'Round',
            required: true,
        }
	],
    description: {
        type: String,
        required: false,
    },
});

const Subset = model('Subset', subsetSchema);
export default Subset;
