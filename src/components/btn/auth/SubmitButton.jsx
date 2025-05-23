import React from "react";

export function SubmitButton({ type, onSubmit }) {
  return (
    <button
      type="submit"
      onClick={onSubmit}
      className="h-12 w-[343px] rounded-xl bg-black font-semibold text-white md:w-[518px]"
    >
      {type}
    </button>
  );
}

export default SubmitButton;
