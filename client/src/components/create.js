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
		setDistance(cur_dist);
		setTimes(cur_times);
		setText(curText);
		// console.log(nestedArray);
	}

	function parseTextArray(text_arr) {
		// I'll need to split up this function into helper functions eventually
		let cur_distance = 0;
		let cur_times = [];
		let cur_multiplier = 1;

		console.log('PARSING TEXT');
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
				let dist_time_data = parseTextArray(line);
				cur_distance += cur_multiplier * dist_time_data[0]; //this no longer works
				let new_times = dist_time_data[1];
				if (new_times.length > 0) {
					for (let i = 0; i < new_times.length; i++) {
						new_times[i] *= cur_multiplier;
					}
					cur_times = updateCurTimes(cur_times, new_times);
				}
			}
			// number x number --> increment distance
			// yes interval check
			else if (numbers_x_numbers.test(line)) {
				let stripped = line.match(numbers_x_numbers)[0];
				let reps = parseInt(stripped.match(/^\d+/)[0]);
				let dist = parseInt(stripped.match(/\d+$/)[0]);
				cur_distance += reps * dist;
				let new_times = getTimes(line);
				if (new_times.length > 0) {
					for (let i = 0; i < new_times.length; i++) {
						new_times[i] *= reps;
					}
					cur_times = updateCurTimes(cur_times, new_times);
				}
			}
			// number x letters, number rounds letters, number x, number rounds --> save mulitplier for child round
			// no interval check
			else if (
				numbers_x_letters.test(line) ||
				numbers_rounds_letters.test(line) ||
				numbers_x.test(line) ||
				numbers_rounds.test(line)
			) {
				cur_multiplier = parseInt(line.match(/^\d+/)[0]);
			}
			// number letters --> increment distance
			// yes interval check
			else if (numbers_letters.test(line)) {
				cur_distance += parseInt(line.match(/^\d+/)[0]);
				let new_times = getTimes(line);
				if (new_times.length > 0) {
					cur_times = updateCurTimes(cur_times, new_times);
				}
			}
			// letters --> just a title, do nothing
			else {
				// console.log('letters')
			}
		});
		return [cur_distance, cur_times];
	}

	function updateCurTimes(temp_cur_times, temp_new_times) {
		let cur_times = [...temp_cur_times];
		let new_times = [...temp_new_times];
		// if you are adding the first intervals
		if (cur_times.length === 0) {
			cur_times = new_times;
		}
		// if you are adding the same number of intervals to the already existing intervals
		else if (cur_times.length === new_times.length) {
			for (let i = 0; i < cur_times.length; i++) {
				cur_times[i] += new_times[i];
			}
		}
		// if you are adding more intervals than already exist
		else if (cur_times.length < new_times.length) {
			for (let i = 0; i < new_times.length; i++) {
				if (i < cur_times.length) {
					cur_times[i] += new_times[i];
				} else {
					cur_times.push(
						temp_cur_times[temp_cur_times.length - 1] + new_times[i]
					);
				}
			}
		}
		// if you are adding fewer intervals than already exist
		else {
			for (let i = 0; i < cur_times.length; i++) {
				if (i < new_times.length) {
					cur_times[i] += new_times[i];
				} else {
					cur_times[i] += new_times[new_times.length - 1];
				}
			}
		}

		return cur_times;
	}

	function formatTime(seconds) {
		// return a time string in the format of hh:mm:ss
		// makes sure there are no leading 0s
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const timeArray = [];

		// hours have no leading 0s, can be any length, and never shown if 0
		if (hours > 0) {
			timeArray.push(hours.toString());
		}

		// minutes show leading 0s if hours > 0 otherwise don't show leading 0s, max length of 2, if hours == 0 leading 0s are stripped at the return 
		if (minutes < 10) {
			timeArray.push('0' + minutes.toString());
		} else {
			timeArray.push(minutes.toString());
		}

		// seconds always show leading 0s, the length is always 2
		if (remainingSeconds < 10) {
			timeArray.push('0' + remainingSeconds.toString());
		} else {
			timeArray.push(remainingSeconds.toString());
		}

		// return the joined array that has been stripped of any leading 0s
		return timeArray.join(':').replace(/^0+/, '');
	}

	function getTimes(line) {
		let times = [];
		const at = /@\s*(\d*:\d\d\s*)+(,\s*\d*:\d\d\s*)*$/;
		// if the line has the correct format for an interval
		if (at.test(line)) {
			console.log(`we have a well formatted interval`);
			let intervals = line.match(/\d*:\d\d/g); // get all the intervals that have the correct format
			console.log(intervals);
			intervals.forEach((interval) => {
				let interval_arr = interval.match(/\d+/g); // separate the interval into minutes and seconds arr
				if (interval_arr.length > 1) {
					// if there are minutes and seconds
					let minutes = parseInt(interval_arr[0]);
					let seconds = parseInt(interval_arr[1]);
					let total_seconds = minutes * 60 + seconds;
					times.push(total_seconds);
				} else {
					// else there are only seconds
					let seconds = parseInt(interval_arr[0]);
					times.push(seconds);
				}
			});
		}
		return times;
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
				<div className="workout-stats">
					<div className="distance-container">
						<div className="distance-label">distance:</div>
						<div className="distance">{distance}</div>
					</div>
					<div className="time-container">
						<div className="time-label">time:</div>
						<div className="time">
							{times.map((time, index) => {
								if (index === times.length - 1) {
									return formatTime(time);
								} else {
									return formatTime(time) + ', ';
								}
							})}
						</div>
					</div>
				</div>
			</div>

			{/**
			 * still trying to decide what this next area will be
			 * could be tool tips
			 * could show stats for currently highlighted area
			 * could show saved subsets for quick insertion
			 * leaning towards tool tips so people know how to use it
			 * 		-> maybe make it collapsible
			*/}
			<div className="line-stats"></div>
		</div>
	);
}
