import express from 'express';
import cors from 'cors';
import './loadEnvironment.mjs';
import './loadDB.mjs'
import workout from "./routes/workout.mjs";
import subset from "./routes/subset.mjs";
import round from "./routes/round.mjs";
import rep from "./routes/rep.mjs";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// rountes being used
app.use("/workout", workout);
app.use("/subset", subset);
app.use("/round", round);
app.use("/rep", rep);

// start the Express server
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
