import { useState } from "react";
/**
 * How to use useModal
 * const {isModalOpen, openModal, closeModal} = useModal()
 * <Modal isModalOpen, openModal, closeModal />
 * This will be reusable trhough out all components 
 * which is helpful as does not need to rewritgh the code 
 */

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
