import React, { useState } from 'react';

export default function NumberAreaToggle({ number, onNumChange, className }) {
	const focusedStyle = {
		border: '1px solid blue',
		backgroundColor: 'white',
		outline: 'none',
		height: '100%',
		width: '100%',
	};
	const unfocusedStyle = {
		border: 'none',
		background: 'none',
		outline: 'none',
		height: '100%',
		width: '100%',
	};
	const [style, setStyle] = useState(unfocusedStyle);

	const handleFocus = (event) => {
		setStyle(focusedStyle);
		event.target.select();
	};

	const handleBlur = (event) => {
		if (!event.target.value) {
			onNumChange(1);
		}
		setStyle(unfocusedStyle);
	};

	const handleNumberChange = (event) => {
		onNumChange(event.target.value);
	};

	function handleKeyDown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
		}
	}

	return (
		<div className={`num-input-container ${className}`}>
			<input
				type="number"
				value={number}
				onChange={handleNumberChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				style={style}
				rows={1}
				onKeyDown={handleKeyDown}
				min={1}
			/>
		</div>
	);
}
