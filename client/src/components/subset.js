import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './subset.css';

export default function Subset() {
	const [form, setForm] = useState({
		title: '',
		rounds: [],
		description: '',
	});
	const navigate = useNavigate();

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	// This function will handle the submission.
	async function onSubmit(e) {
		e.preventDefault();

		// When a post request is sent to the create url, we'll add a new record to the database.
		const newWorkout = { ...form };

		await fetch('http://localhost:5050/subset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newWorkout),
		}).catch((error) => {
			window.alert(error);
			return;
		});

		setForm({ title: '', rounds: [], description: '' });
		navigate('/create');
	}

	// This following section will display the form that takes the input from the user.
	return (
		<div className='subset'>
			<div onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="title">Subset Title</label>
					<input
						type="text"
						className="form-control"
						id="title"
						value={form.title}
						onChange={(e) => updateForm({ title: e.target.value })}
					/>
				</div>
				<button className="add-subset" type="button">add round</button>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<input
						type="text"
						className="form-control"
						id="description"
						value={form.description}
						onChange={(e) => updateForm({ description: e.target.value })}
					/>
				</div>

				<div className="form-group">
					<input
						type="submit"
						value="Create subset"
						className="btn btn-primary"
					/>
				</div>
			</div>
		</div>
	);
}
