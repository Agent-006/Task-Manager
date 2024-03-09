import React, { forwardRef, useId } from "react";

function TextArea(
  {
    label,
    cols = "20",
    rows = "4",
    className = "",
    textareaClasses = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className={`w-full flex flex-col my-3`}>
      {label && (
        <label className="text-sm my-1" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        className={`${className}`}
        ref={ref}
        name={label}
        id={id}
        cols={cols}
        rows={rows}
        {...props}
      />
    </div>
  );
}

export default forwardRef(TextArea);
