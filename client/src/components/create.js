import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './create.css';

export default function Create() {
	const [text, setText] = useState('');
	const [distance, setDistance] = useState(0);
	const [time, setTime] = useState(0);

	function handleTextChange(event) {
		let curText = event.target.value
		setText(curText);
		const lines = curText.split('\n');
		console.log(lines);
	}

	return (
		<div className="workout-container">
			<div className="edit-container">
				<textarea
					className="text"
					value={text}
					placeholder="Write your set here..."
					onChange={handleTextChange}
				/>
				<div className="line-stats"></div>
			</div>
			<div className="workout-stats">
				<div className="distance-container">
					<div className="distance-label">distance:</div>
					<div className="distance">{distance}</div>
				</div>
				<div className="time-container">
					<div className="time-label">time:</div>
					<div className="time">{time}</div>
				</div>
			</div>
		</div>
	);
}
