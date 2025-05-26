import React from "react";

function Input({ title, placeholder, onChange, value, height }) {
  const isHeight = Boolean(height);

  return (
    <div className="font-pretendard">
      <label className="block text-sm font-medium text-[var(--color-gray-900)]">
        {title}
      </label>
      {isHeight ? (
        <textarea
          className={`mt-[8px] w-full ${height} resize-none rounded-xl border-[1px] border-[var(--color-gray-200)] pt-[12px] pl-[20px] placeholder-[var(--color-gray-400)]`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      ) : (
        <input
          className={`placeholder-border-[var(--color-gray-400)] mt-[8px] h-[48px] w-full rounded-xl border-[1px] border-[var(--color-gray-200)] pl-[20px]`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}

export default Input;
