import React, { useState, useEffect } from 'react';
import Round from './round.js';
import TextAreaToggle from './textAreaToggle.js';
import './subset.css';
import NumberInputToggle from './numberInputToggle.js';
import NumIntervalsContext from './NumIntervalsContext.js';

export default function Subset() {
	const [title, setTitle] = useState('');
	const [rounds, setRounds] = useState([]);
	const [description, setDescription] = useState('');
	const [numIntervals, setNumIntervals] = useState(1);

	function addRound() {
		setRounds([...rounds, <Round key={rounds.length}/>]);
	}

	function roundList() {
		return rounds.map((round) => {
			return round;
		});
	}

	return (
		<div className="card subset">
			<div className="card-header">
				<TextAreaToggle
					className="subset-header-title subset-header-item"
					defaultText="Untitled Subset - Description..."
					onTextChange={setTitle}
				/>

				<div className="num-intervals-label subset-header-item">Intervals:</div>
				<NumberInputToggle
					className="subset-header-item num-intervals"
					number={numIntervals}
					onNumChange={setNumIntervals}
				/>
			</div>

			<div className="card-body subset-body">
				
				<NumIntervalsContext.Provider value={numIntervals}>
					<div className="rounds">{roundList()}</div>
				</NumIntervalsContext.Provider>
				

				<button className="add-round" type="button" onClick={addRound}>
					add round
				</button>
			</div>
		</div>
	);
}
