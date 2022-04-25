import React, { useImperativeHandle, useRef } from 'react';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activate = () => inputRef.current.focus();

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div>
      <label htmlFor={props.type}>{props.label}</label>
      <input
        placeholder={props.placeholder}
        ref={inputRef}
        type={props.type}
        id={props.type}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
