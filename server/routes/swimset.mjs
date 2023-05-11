import express from 'express';
import Set from '../models/Set.mjs';
import Subset from '../models/Subset.mjs';
import Round from '../models/Round.mjs';
import Rep from '../models/Rep.mjs';

const router = express.Router();

// This section will help you get a list of all the sets.
router.get('/', async (req, res) => {
	try {
	  const sets = await Set.find({});
    res.send(sets);
	} catch (err) {
	  res.send(err);
	}
});

export default router;
