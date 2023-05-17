import React, { useState } from 'react';

import './numberInputToggle.css';

export default function NumberAreaToggle(props) {
	const [number, setNumber] = useState('');
	const focusedStyle = {
		border: '1px solid blue',
		backgroundColor: 'white',
		outline: 'none',
	};
	const unfocusedStyle = {
		border: 'none',
		background: 'none',
		outline: 'none',
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
		if (event.target.value === '') {
			setNumber('')
		} else if (event.target.value < 1) {
			setNumber(1);
		} else {
			setNumber(event.target.value);
		}
		props.onNumChange({ [props.formItem]: number });
	};

	return (
		<input
			type='number'
			placeholder={1}
			value={number}
			onChange={handleNumberChange}
			onBlur={handleBlur}
			onFocus={handleFocus}
			style={style}
			className="num-input"
			rows={1}
		/>
	);
}
