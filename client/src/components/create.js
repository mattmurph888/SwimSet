import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Subset from './subset.js';
import TextAreaToggle from './textAreaToggle.js';
import './create.css';

export default function Create() {
	const [title, setTitle] = useState('');
	const [subsets, setSubsets] = useState([]);
	const [description, setDescription] = useState('');

	const navigate = useNavigate();

	function addSubset() {
		setSubsets([...subsets, <Subset key={subsets.length}/>]);
	}

	// This function will handle the submission.
	async function onSubmit(e) {
		e.preventDefault();
		console.log('submitting form');
	}

	function subsetList() {
		return subsets.map((subset) => {
			return subset;
		});
	}

	return (
		<div className="workout-container">
			<div className="workout card">
				<form onSubmit={onSubmit}>
					<div className="card-header workout-header">
						<TextAreaToggle
							className="workout-title"
							defaultText="Untitled Workout"
							onTextChange={setTitle}
						/>
						<TextAreaToggle
							className="workout-description"
							defaultText="Workout Description"
							onTextChange={setDescription}
						/>
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
