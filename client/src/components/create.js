import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './create.css';

export default function Create() {
	const [text, setText] = useState('');
	const [distance, setDistance] = useState(0);
	const [times, setTimes] = useState([]);

	function handleTextChange(event) {
		let curText = event.target.value;
		let nestedArray = createNestedArray(curText);
		let parsed_data = parseTextArray(nestedArray);
		let cur_dist = parsed_data[0];
		let cur_times = parsed_data[1];
		setDistance(cur_dist)
		setTimes(...cur_times)
		setText(curText);
		// console.log(nestedArray);
	}

	function parseTextArray(text_arr) {

		// I'll need to split up this function into helper functions eventually
		let cur_distance = 0;
		let cur_times = [];
		let cur_multiplier = 1;

		console.log('PARSING TEXT')
		const numbers_x_numbers = /^\d+\s*(x)\s*\d+/i;
		const numbers_x_letters = /^\d+\s*(x)\s+\w+/i;
		const numbers_rounds_letters = /^\d+\s*(rounds)\s+\w+/i;
		const numbers_x = /^\d+\s*(x)\s*$/i;
		const numbers_rounds = /^\d+\s*(rounds)\s*$/i;
		const numbers_letters = /^\d+\w*/i;

		text_arr.forEach((line) => {
			// if subset array --> prev round mulitplier * parseTextArray(subset array)
			// no interval check
			if (Array.isArray(line)) {
				console.log('this is a subset array')
				cur_distance += cur_multiplier * parseTextArray(line); //this no longer works 
			}
			// number x number --> increment distance
			// yes interval check
			else if (numbers_x_numbers.test(line)) {
				console.log('number x number')
				let stripped = line.match(numbers_x_numbers)[0];
				let reps = parseInt(stripped.match(/^\d+/)[0]);
				let dist = parseInt(stripped.match(/\d+$/)[0]);
				cur_distance += reps * dist;
				console.log(getTimes(line));
			}
			// number x letters, number rounds letters, number x, number rounds --> save mulitplier for child round
			// no interval check
			else if (
				numbers_x_letters.test(line) || 
				numbers_rounds_letters.test(line) ||
				numbers_x.test(line) ||
				numbers_rounds.test(line)
				) {
				console.log('round mulitplier')
				cur_multiplier = parseInt(line.match(/^\d+/)[0]);
			}
			// number letters --> increment distance
			// yes interval check
			else if (numbers_letters.test(line)) {
				console.log('numbers letters')
				cur_distance += parseInt(line.match(/^\d+/)[0])
				let new_times = getTimes(line);
				cur_times = updateCurTimes(cur_times, new_times);
			}
			// letters --> just a title, do nothing
			else {
				console.log('letters')
			}
		});
		return [cur_distance, cur_times];
	}

	function updateCurTimes(cur_times, new_times) {
		if (cur_times.length === new_times.length) {
			for (let i = 0; i < cur_times.length; i++) {
				cur_times[i] += new_times[i]
			}
		}
	}

	function getTimes(line) {
		let times = [];
		const at = /@\s*(\d+:\d\d\s*)+(,\s*\d+:\d\d\s*)*$/;
		if (at.test(line)) {
			console.log(`we have a well formatted interval`);
			let intervals = line.match(/\d+:\d\d/g);
			console.log(intervals);
			intervals.forEach((interval) => {
				let interval_arr = interval.match(/\d+/g);
				console.log(interval_arr);
				let minutes = parseInt(interval_arr[0]);
				let seconds = parseInt(interval_arr[1]);
				let total_seconds = (minutes * 60) + seconds;
				times.push(total_seconds)
			});
		}
		return times
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
					<div className="time">{times}</div>
				</div>
			</div>
		</div>
	);
}
