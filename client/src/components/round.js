import React, { useState, useEffect } from 'react';
import Rep from './rep.js';
import TextAreaToggle from './textAreaToggle.js';
import NumberInputToggle from './numberInputToggle.js';
import './round.css';

export default function Round() {
	const [num, setNum] = useState(1);
	const [reps, setReps] = useState([]);
	const [description, setDescription] = useState('');

	function addRep() {
		setReps([...reps, <Rep key={reps.length} />]);
	}

	function repList() {
		return reps.map((rep) => {
			return rep;
		});
	}

	return (
		<div className="round">
			<div className="round-body">
				<div className="num-x">
					<NumberInputToggle
						className="round-num"
						number={num}
						onNumChange={setNum}
					/>
					<div className="x">x</div>
				</div>

				<div className="reps-area">
					<div className="reps">{repList()}</div>
					<button className="add-rep" type="button" onClick={addRep}>
						add rep
					</button>
					<TextAreaToggle
						defaultText="Round Description"
						onTextChange={setDescription}
					/>
				</div>
			</div>
		</div>
	);
}
