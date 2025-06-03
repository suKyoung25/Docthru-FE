"use client";

import React, { forwardRef, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import calender from "@/assets/icon/calendar_48px.svg";

// Input 컴포넌트
const Input = forwardRef(function Input(
  {
    type,
    title,
    placeholder,
    onChange,
    value,
    height,
    deadline,
    setDeadline,
    hasError,
    ...rest // register가 전달하는 props (ref, onChange 등)
  },
  ref
) {
  const isHeight = Boolean(height);
  const datePickerRef = useRef(null);

  if (type === "date") {
    return (
      <div className="flex w-full flex-col">
        <label className="mb-2 text-sm font-medium text-[var(--color-gray-900)]">마감일</label>
        <div className="relative" onClick={() => datePickerRef.current.setFocus()}>
          <Image className="absolute top-2 right-4" src={calender} alt="달력 아이콘" priority />
        </div>
        <DatePicker
          ref={datePickerRef}
          selected={deadline}
          onChange={(date) => setDeadline(date)}
          dateFormat="yy/MM/dd"
          placeholderText="YYYY-MM-DD"
          minDate={new Date()}
          className={`h-[48px] w-full rounded-xl border px-4 py-2 focus:ring-1 focus:outline-none ${hasError ? "border-red-500" : "border-gray-200"}`}
          calendarClassName="!z-50"
        />
      </div>
    );
  }

  return (
    <div className="font-pretendard">
      <label className="mb-2 block text-sm font-medium text-[var(--color-gray-900)]">{title}</label>
      {isHeight ? (
        <textarea
          className={`w-full ${height} ${hasError ? "border-red-500" : "border-gray-200"} resize-none rounded-xl border-[1px] pt-[12px] pl-[20px] placeholder-[var(--color-gray-400)]`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          ref={ref}
          {...rest}
        />
      ) : (
        <input
          className={`placeholder-border-[var(--color-gray-400)] ${hasError ? "border-red-500" : "border-gray-200"} h-[48px] w-full rounded-xl border-[1px] pl-[20px]`}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          ref={ref}
          {...rest}
        />
      )}
    </div>
  );
});

export default Input;
