import React, { useState } from 'react';
import './numberInputToggle.css';

export default function NumberInputToggle(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [number, setNumber] = useState(1);

	const handleFocus = () => {
		setIsEditing(true);
	};

	const handleBlur = () => {
		if (number < 1) {
			setNumber(1);
		} 
		setIsEditing(false);
		props.onNumChange({ [props.formItem]: number });
	};

	const handleChange = (event) => {
		const newNumber = parseInt(event.target.value);
		if (newNumber > 0) {
			setNumber(newNumber);
		} else {
			setNumber('');
		}
	};

	if (isEditing) {
		return (
			<input
				type="number"
				value={number}
				onChange={handleChange}
				onBlur={handleBlur}
				className="num-input"
			/>
		);
	} else {
		return (
			<div className="num" onClick={handleFocus}>
				{number}
			</div>
		);
	}
}
