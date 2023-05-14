import React, { useState } from "react";

export default function TextAreaToggle(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(props.defaultText);

  const handleFocus = () => {
    if (text === props.defaultText) {
        setText('');
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (text === '') {
        setText(props.defaultText);
    }
    setIsFocused(false);
    props.onTextChange({ [props.formItem]: text });
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      {isFocused ? (
        <textarea placeholder={props.defaultText} value={text} onChange={handleTextChange} onBlur={handleBlur} />
      ) : (
        <div onClick={handleFocus}>{text}</div>
      )}
    </div>
  );
}








