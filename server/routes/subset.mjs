import express, { request } from 'express';
import Subset from '../models/Subset.mjs';

const router = express.Router();


// get all Subsets
router.get('/', async (req, res) => {
	try {
		const subsets = await Subset.find({});
		res.json(subsets);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
});


// get a Subsets
router.get('/:id', getSubset, (req, res) => {
	res.json(res.subset)
});


// create a Subsets
router.post('/', async (req, res) => {
	let subset = new Subset({
		title: req.body.title,
		rounds: req.body.rounds,
		description: req.body.description,
	})
	try {
		const new_subset = await subset.save();
		res.status(201).send(new_subset);
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
});


// edit a Subsets
router.patch('/:id', getSubset, (req, res) => {
	res.send(res.set)
});


// delete a Subsets
router.delete('/:id', async (req, res) => {
	try {
		await Subset.deleteOne({ _id: req.params.id })
		res.json({ message: 'subset deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});



async function getSubset(req, res, next) {
	let subset;
	try {
		subset = await Subset.findById(req.params.id);
		if (subset == null) {
			return res.status(404).json({ message: "can't find Subset" })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.subset = subset;
	next();
}


export default router;
