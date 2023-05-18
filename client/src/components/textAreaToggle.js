import React, { useState } from 'react';

export default function TextAreaToggle(props) {
	const [text, setText] = useState('');
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

	const handleTextChange = (event) => {
		// console.log(event.target.clientHeight);
		event.target.parentElement.style.height = 'auto';
		event.target.parentElement.style.height = `${event.target.scrollHeight}px`;
		setText(event.target.value);
		props.onTextChange({ [props.formItem]: text });
	};

	return (
		<div className={`textarea-toggle-container ${props.className}`}>
			<textarea
				placeholder={props.defaultText}
				value={text}
				onChange={handleTextChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				style={style}
				rows={1}
			/>
		</div>
	);
}
