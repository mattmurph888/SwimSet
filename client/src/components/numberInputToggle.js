import React, { useState } from 'react';

export default function NumberAreaToggle(props) {
	const [number, setNumber] = useState('');
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
		setStyle(unfocusedStyle);
	};

	const handleNumberChange = (event) => {
		// console.log(event.target.clientHeight);
		if (event.target.value === '') {
			setNumber('');
		} else if (event.target.value < 1) {
			setNumber(1);
		} else {
			setNumber(event.target.value);
		}
		props.onNumChange({ [props.formItem]: number });
	};

	function handleKeyDown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
		}
	}

	return (
		<div className={`num-input-container ${props.className}`}>
			<input
				type="number"
				placeholder={1}
				value={number}
				onChange={handleNumberChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				style={style}
				rows={1}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
}
