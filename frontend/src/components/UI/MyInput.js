import { forwardRef } from "react";

const MyInput = ({ children, ...props }, ref) => {
  return (
    <>
      <input
        {...props}
        ref={ref ? ref : null}
        className={`input_type_${props.theme} popup__input popup__input_type_${props.name}`}
        value={props.value}
      />
      <span
        className={
          props.error
            ? `popup__error_visible popup__error-text ${props.name}-error`
            : `popup__error-text ${props.name}-error`
        }
      >
        {props.error}
      </span>
    </>
  );
};
const forwardedMyInput = forwardRef(MyInput);

export default forwardedMyInput;
