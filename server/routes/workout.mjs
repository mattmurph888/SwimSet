import express, { request } from 'express';
import Workout from '../models/Workout.mjs';

const router = express.Router();


// get all workout
router.get('/', async (req, res) => {
	try {
		const workouts = await Workout.find({});
		res.json(workouts);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
});


// get a workout
router.get('/:id', getWorkout, (req, res) => {
	res.json(res.workout)
});


// create a workout
router.post('/', async (req, res) => {
	let workout = new Workout({
		title: req.body.title,
		subsets: req.body.subsets,
		description: req.body.description,
	})
	try {
		const new_workout = await workout.save();
		res.status(201).send(new_workout);
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
});


// edit a workout
router.patch('/:id', getWorkout, (req, res) => {
	res.send(res.workout)
});


// delete a workout
router.delete('/:id', async (req, res) => {
	try {
		await Workout.deleteOne({ _id: req.params.id })
		res.json({ message: 'workout deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
});



async function getWorkout(req, res, next) {
	let workout;
	try {
		workout = await Workout.findById(req.params.id);
		if (workout == null) {
			return res.status(404).json({ message: "can't find Workout" })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.workout = workout;
	next();
}


export default router;
