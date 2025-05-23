import React from "react";

function Input({ title, placeholder, onChange, value, height }) {
  return (
    <div className="font-pretendard">
      <label className="block text-sm font-medium text-[var(--color-gray-900)]">
        {title}
      </label>
      <input
        className={`placeholder-border-[var(--color-gray-400)] mt-[8px] w-full ${height} rounded-xl border-[1px] border-[var(--color-gray-200)] pl-[20px]`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Input;
