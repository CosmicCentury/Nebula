import React from "react";

type ModalType = "success" | "failure" | "custom";

interface useModal {
  type: ModalType;
}

const useModal = ({ type }: useModal) => {};

export default useModal;
