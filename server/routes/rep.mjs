import express, { request } from 'express';
import Rep from '../models/Rep.mjs';

const router = express.Router();


// get all Reps
router.get('/', async (req, res) => {
	try {
		const reps = await Rep.find({});
		res.json(reps);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
});


// get a Rep
router.get('/:id', getRep, (req, res) => {
	res.json(res.rep)
});


// create a Rep
router.post('/', async (req, res) => {
	let rep = new Rep({
		num: req.body.num,
		dist: req.body.dist,
		description: req.body.description,
        intervals: req.body.intervals
	})
	try {
		const new_rep = await rep.save();
		res.status(201).send(new_rep);
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
});


// edit a Rep
router.patch('/:id', getRep, (req, res) => {
	res.send(res.rep)
});


// delete a Rep
router.delete('/:id', async (req, res) => {
	try {
		await Rep.deleteOne({ _id: req.params.id })
		res.json({ message: 'rep deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});



async function getRep(req, res, next) {
	let rep;
	try {
		rep = await Rep.findById(req.params.id);
		if (rep == null) {
			return res.status(404).json({ message: "can't find Rep" })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.rep = rep;
	next();
}


export default router;
