import React, { useState } from 'react';

export default function TextAreaToggle(props) {
	const [text, setText] = useState('');
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

	const handleTextChange = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
		setText(event.target.value);
		props.onTextChange({ [props.formItem]: text });
	};

	return (
		<textarea
			placeholder={props.defaultText}
			value={ text }
			onChange={handleTextChange}
			onBlur={handleBlur}
			onFocus={handleFocus}
			style={style}
			className="text-area-toggle"
      rows = {1}
		/>
	);
}
