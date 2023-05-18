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
				<TextAreaToggle key={form.intervals.length} defaultText="00:00" />,
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
			<div className="rep-item num-reps">
				<NumberInputToggle onNumChange={updateForm} formItem="num" />
			</div>

			<div className="rep-item by">x</div>

			<div className="rep-item dist">
				<NumberInputToggle onNumChange={updateForm} formItem="dist" />
			</div>

			<div className="rep-item rep-description">
				<TextAreaToggle
					defaultText="Rep Description"
					onTextChange={updateForm}
				/>
			</div>

			<div className="rep-item at">@</div>

			<div className="rep-item intervals-container">
				<div className="intervals">
					{intervalsList()}
					<button className="add-interval" type="button" onClick={addInterval}>
						+
					</button>
				</div>
			</div>
		</div>
	);
}
