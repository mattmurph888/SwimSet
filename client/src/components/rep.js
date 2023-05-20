import React, { useState, useEffect, useContext } from 'react';
import TextAreaToggle from './textAreaToggle.js';
import NumberInputToggle from './numberInputToggle.js';
import NumIntervalsContext from './NumIntervalsContext.js';
import './rep.css';

export default function Rep() {
	const [num, setNum] = useState(1);
	const [dist, setDist] = useState(25);
	const [intervals, setIntervals] = useState([]);
	const [description, setDescription] = useState('');
	const numIntervals = useContext(NumIntervalsContext);

	useEffect(() => {
		setIntervals(prev => {
			let tempIntervals = [];
			if (prev.length < numIntervals) {
				for (let i = 0; i < numIntervals-prev.length; i++) {
					tempIntervals.push(
						<TextAreaToggle
							className="interval"
							key={prev.length + i}
							defaultText="00:00"
						/>
					);
				}
				return [...prev, ...tempIntervals]
			} else {
				return prev.slice(0,numIntervals);
			}
		});
	}, [numIntervals]);

	function intervalsList() {
		return intervals.map((interval, i) => {
			return (
				<div key={i} className="interval-num">
					{interval}
					{i === intervals.length - 1 ? '' : ', '}
				</div>
			);
		});
	}

	return (
		<div className="rep">
			<NumberInputToggle
				className="rep-item num-reps"
				number={num}
				onNumChange={setNum}
			/>

			<div className="rep-item by">x</div>

			<NumberInputToggle
				className="rep-item dist"
				number={dist}
				onNumChange={setDist}
			/>

			<TextAreaToggle
				className="rep-item rep-description"
				defaultText="Rep Description"
				onTextChange={setDescription}
			/>

			<div className="rep-item at">@</div>

			<div className="rep-item intervals">
				{intervalsList()}
				<button className="add-interval" type="button">
					+
				</button>
			</div>
		</div>
	);
}
