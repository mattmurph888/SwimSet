import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Subset from './subset.js';
import TextAreaToggle from './textAreaToggle.js';
import './create.css';

export default function Create() {
	const [form, setForm] = useState({
		title: '',
		subsets: [],
		description: '',
	});

	const navigate = useNavigate();

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	function addSubset() {
		updateForm({
			subsets: [...form.subsets, <Subset key={form.subsets.length} />],
		});
	}

	// This function will handle the submission.
	async function onSubmit(e) {
		e.preventDefault();

		// When a post request is sent to the create url, we'll add a new record to the database.
		const newWorkout = { ...form };

		await fetch('http://localhost:5050/workout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newWorkout),
		}).catch((error) => {
			window.alert(error);
			return;
		});

		setForm({ title: '', subsets: [], description: '' });
		navigate('/');
	}

	function subsetList() {
		return form.subsets.map((subset) => {
			return subset;
		});
	}

	// This following section will display the form that takes the input from the user.
	return (
		<div className="workout-container">
			<div className="workout card">
				<form onSubmit={onSubmit}>
					<div className="card-header workout-header">
						<div className="workout-title">
							<TextAreaToggle
								defaultText="Untitled Workout"
								onTextChange={updateForm}
								formItem="title"
							/>
						</div>
						<div className="workout-description">
							<TextAreaToggle
								defaultText="Workout Description"
								onTextChange={updateForm}
								formItem="description"
							/>
						</div>
					</div>

					<div className="card-body">
						{subsetList()}
						<button className="add-subset" type="button" onClick={addSubset}>
							add subset
						</button>
					</div>

					<div className="card-footer">
						<input
							type="submit"
							value="Save workout"
							className="btn btn-primary"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
