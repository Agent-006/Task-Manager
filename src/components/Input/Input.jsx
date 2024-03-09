import React, { forwardRef, useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full flex flex-col my-3">
      {label && (
        <label htmlFor={id} className="text-sm my-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
}

export default forwardRef(Input);
