import { useState } from "react";

interface UseModalReturn {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
};

export default useModal;