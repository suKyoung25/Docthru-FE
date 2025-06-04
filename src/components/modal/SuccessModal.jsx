import React, { useState } from "react";

import { useEffect } from "react";

/**
 * 성공 알림 후 자동으로 사라지는 모달 컴포넌트
 * @param {string} text - 모달에 표시할 메시지
 * @param {string} [className] - 추가적인 커스텀 클래스
 * @param {() => void} onClose - 모달 닫기 핸들러 (상위 컴포넌트에서 전달)
 * @param {number} [duration] - 모달이 유지되는 시간(ms), 기본값은 1000(1초)
 * @returns {JSX.Element}
 */
export default function SuccessModal({ text, className = "", onClose, duration = 1000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, duration);

    const closeTimer = setTimeout(() => {
      onClose?.();
    }, duration + 300); // fade-out 애니메이션 시간 고려

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center pb-10 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <div className="flex h-fit w-fit items-center justify-center rounded-4xl border border-gray-800 bg-black px-4 py-2">
        <p className="text-sm font-medium text-white">{text}</p>
      </div>
    </div>
  );
}
