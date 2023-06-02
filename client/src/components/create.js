import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './create.css';

export default function Create() {
	const [text, setText] = useState('');
	const [distance, setDistance] = useState(0);
	const [time, setTime] = useState(0);

	function handleTextChange(event) {
		let curText = event.target.value;
		let nestedArray = createNestedArray(curText);
		setText(curText);
		console.log(nestedArray);
	}

	function parseText(text) {
		// if it starts with letters/symbols it is a title and should be ignored 
		// if it starts with numbes
			// number x number indicates a rep
				// reps x distance
				// freestyle drill 
				// @ 1:10 
				// also need to calculate distance and time
			// number x letters indicates a round
				// need to mulitply num rounds by distance and intervals
	}

	function createNestedArray(input) {
		const lines = input.split('\n');
		const nestedArray = [];

		// for each line check if there is a tab to start and append an array if there is
		lines.forEach((line) => {
			const tabsCount = countTabsAtStart(line);
			const lineContent = line.trim(); // Remove leading/trailing spaces

			let currentArray = nestedArray;
			for (let i = 0; i < tabsCount; i++) {
				if (!Array.isArray(currentArray[currentArray.length - 1])) {
					currentArray.push([]);
				}
				currentArray = currentArray[currentArray.length - 1];
			}
			currentArray.push(lineContent);
		});

		return nestedArray;
	}

	function countTabsAtStart(line) {
		let tabCount = 0;
		for (let i = 0; i < line.length; i++) {
			if (line[i] === '\t') {
				tabCount++;
			} else {
				break;
			}
		}
		return tabCount;
	}

	function handleKeyDown(event) {
		// prevent tab key from unfocusing the textbox
		// eventually maybe add some custom tab utility
		if (event.key === 'Tab') {
			event.preventDefault();
			const textarea = event.target;
			const { selectionStart, selectionEnd } = textarea;
			const value = textarea.value;
			textarea.value =
				value.substring(0, selectionStart) +
				'\t' +
				value.substring(selectionEnd);
			textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
		}
	}

	return (
		<div className="workout-container">
			<div className="edit-container">
				<textarea
					className="text"
					value={text}
					placeholder="Write your set here..."
					onChange={handleTextChange}
					onKeyDown={handleKeyDown}
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
