import React, { useState } from 'react';
import TextAreaToggle from './textAreaToggle.js';
import NumberInputToggle from './numberInputToggle.js';
import './rep.css';

export default function Rep() {
	const [form, setForm] = useState({
		num: 1,
		dist: 25,
		description: '',
		intervals: [],
	});

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	function addInterval() {
		updateForm({
			intervals: [
				...form.intervals,
				<TextAreaToggle
					className="interval"
					key={form.intervals.length}
					defaultText="00:00"
				/>,
			],
		});
	}

	function intervalsList() {
		return form.intervals.map((interval, i) => {
			return (
				<div key={i} className="interval-num">
					{interval}
					{i === form.intervals.length - 1 ? '' : ', '}
				</div>
			);
		});
	}

	// This following section will display the form that takes the input from the user.
	return (
		<div className="rep">
			<NumberInputToggle
				className="rep-item num-reps"
				onNumChange={updateForm}
				formItem="num"
			/>

			<div className="rep-item by">x</div>

			<NumberInputToggle
				className="rep-item dist"
				onNumChange={updateForm}
				formItem="dist"
			/>

			<TextAreaToggle
				className="rep-item rep-description"
				defaultText="Rep Description"
				onTextChange={updateForm}
			/>

			<div className="rep-item at">@</div>

			<div className="rep-item intervals">
				{intervalsList()}
				<button className="add-interval" type="button" onClick={addInterval}>
					+
				</button>
			</div>
		</div>
	);
}
