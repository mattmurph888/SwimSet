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
					key={form.intervals.length}
					defaultText="0:00"
				/>,
			],
		});
	}

	function intervalsList() {
		return form.intervals.map((rep, i) => {
			return <div key={i} className='interval-num'>
        {rep} 
        {i===form.intervals.length-1 ? '' : ', '}
      </div>
		});
	}

	// This following section will display the form that takes the input from the user.
	return (
		<div className="rep ">
			<div className="rep-numbers">
				<NumberInputToggle
					onNumChange={updateForm}
					formItem="num"
					className="rep-num"
				/>

				<div className="by">x</div>

				<NumberInputToggle
					onNumChange={updateForm}
					formItem="dist"
					className="rep-dist"
				/>
			</div>

			<div className="rep-description">
				<TextAreaToggle
					defaultText="Rep Description"
					onTextChange={updateForm}
					formItem="description"
				/>
			</div>

			<div className="intervals">
				[{intervalsList()}
				<button className="add-interval" type="button" onClick={addInterval}>
					+
				</button>
				]
			</div>
		</div>
	);
}
