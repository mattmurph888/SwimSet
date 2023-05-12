import express, { request } from 'express';
import Round from '../models/Round.mjs';

const router = express.Router();


// get all Rounds
router.get('/', async (req, res) => {
	try {
		const rounds = await Round.find({});
		res.json(rounds);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
});


// get a Round
router.get('/:id', getRound, (req, res) => {
	res.json(res.round)
});


// create a Round
router.post('/', async (req, res) => {
	let round = new Round({
		num: req.body.num,
		reps: req.body.reps,
		description: req.body.description,
	})
	try {
		const new_round = await round.save();
		res.status(201).send(new_round);
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
});


// edit a Round
router.patch('/:id', getRound, (req, res) => {
	res.send(res.round)
});


// delete a Round
router.delete('/:id', async (req, res) => {
	try {
		await Round.deleteOne({ _id: req.params.id })
		res.json({ message: 'round deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});



async function getRound(req, res, next) {
	let round;
	try {
		round = await Round.findById(req.params.id);
		if (round == null) {
			return res.status(404).json({ message: "can't find Round" })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.round = round;
	next();
}


export default router;
