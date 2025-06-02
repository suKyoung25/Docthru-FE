"use client";

import { useState } from "react";

export const useModalControl = () => {
  const [modalState, setModalState] = useState({
    isOriginalPageOpen: false,
    isDeleteConfirmOpen: false,
    isSubmitConfirmOpen: false,
    isContinue: false
  });

  const updateModalState = (modalType, isOpen) => {
    setModalState((prev) => ({
      ...prev,
      [modalType]: isOpen
    }));
  };

  const toggleModal = (modalType) => {
    updateModalState(modalType, !modalState[modalType]);
  };

  return {
    modalState,
    updateModalState,
    toggleModal
  };
};
