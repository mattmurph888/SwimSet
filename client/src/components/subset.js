import React, { useState } from 'react';
import Round from './round.js';
import TextAreaToggle from './textAreaToggle.js';
import './subset.css';

export default function Subset() {
	const [form, setForm] = useState({
		title: '',
		rounds: [],
		description: '',
	});

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	function addRound() {
		updateForm({
			rounds: [...form.rounds, <Round key={form.rounds.length} />],
		});
	}

	function roundList() {
		return form.rounds.map((round) => {
			return round;
		});
	}

	// This following section will display the form that takes the input from the user.
	return (
		<div className="subset ">
			<div className="subset-header">
				<TextAreaToggle
					defaultText="Untitled Subset - Description..."
					onTextChange={updateForm}
					formItem="title"
				/>
			</div>

			<div className="subset-body">
                <div className="rounds">{roundList()}</div>
				
				<button className="add-round" type="button" onClick={addRound}>
					add round
				</button>
			</div>

            <hr></hr>
		</div>
	);
}
