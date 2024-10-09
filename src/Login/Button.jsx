import React from "react";

function Button({ text, className }) {
  return (
    <button
      type="submit"
      className={"px-16 py-3.5 w-full text-sm text-white whitespace-nowrap bg-blue-700 rounded-xl ${className}"}
    >
      {text}
    </button>
  );
}

export default Button;