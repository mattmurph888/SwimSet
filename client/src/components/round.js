import React, { useState } from 'react';
import Rep from './rep.js';
import TextAreaToggle from './textAreaToggle.js';
import NumberInputToggle from './numberInputToggle.js';
import './round.css';

export default function Round() {
	const [form, setForm] = useState({
		num: 1,
		reps: [],
		description: '',
	});

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	function addRep() {
		updateForm({
			reps: [...form.reps, <Rep key={form.reps.length} />],
		});
	}

	function repList() {
		return form.reps.map((rep) => {
			return rep;
		});
	}

	// This following section will display the form that takes the input from the user.
	return (
		<div className="round card">
			<div className="card-body">
				<NumberInputToggle 
                    onNumChange={updateForm}
                    formItem="num"
                    className="round-num"
                />

                <div>x</div>

				<div className="reps">
					{repList()}

					<button className="add-rep" type="button" onClick={addRep}>
						add rep
					</button>
				</div>
			</div>

			<div className="card-footer">
				<TextAreaToggle
					defaultText="Round Description"
					onTextChange={updateForm}
					formItem="description"
				/>
			</div>
		</div>
	);
}
