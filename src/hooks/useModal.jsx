// useModal.js
import { useState, useCallback } from 'react';

/**
 * Hook genérico para manejo de modales.
 *
 * @param {Object} initialData - Objeto con los datos iniciales para el modal.
 * @returns {Object} Funciones y estados para el manejo del modal.
 */
const useModal = (initialData = {}) => {
  // Estados generales del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(initialData);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  /**
   * Abre el modal.
   *
   * @param {Object|null} data - Datos a cargar en el modal. Si se pasa un objeto se asume modo edición.
   * @param {boolean} isDelete - Indica si se abre en modo eliminación.
   */
  const handleModal = useCallback(
    (data = null, isDelete = false) => {
      if (data) {
        setModalData(data);
        setIsEditMode(true);
      } else {
        setModalData(initialData);
        setIsEditMode(false);
      }
      setIsDeleteMode(isDelete);
      setModalOpen(true);
    },
    [initialData]
  );

  /**
   * Cierra el modal y resetea los estados.
   */
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setModalData(initialData);
    setIsDeleteMode(false);
    setIsEditMode(false);
    setPreviewImage(null);
  }, [initialData]);

  /**
   * Confirma la acción del modal.
   *
   * @param {Function} onConfirm - Callback que se ejecuta al confirmar, recibiendo (modalData, { isDeleteMode, isEditMode }).
   */
  const handleConfirmModal = useCallback(
    (onConfirm) => {
      if (onConfirm && typeof onConfirm === 'function') {
        onConfirm(modalData, { isDeleteMode, isEditMode });
      }
      handleCloseModal();
    },
    [modalData, isDeleteMode, isEditMode, handleCloseModal]
  );

  /**
   * Maneja el cambio de los inputs.
   *
   * @param {Event} e - Evento del input.
   */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Maneja la subida de imágenes.
   *
   * @param {Event} e - Evento del input de tipo file.
   */
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      // Se usa el name del input para asignar la propiedad en modalData (más genérico)
      setModalData((prev) => ({
        ...prev,
        [e.target.name]: file,
      }));
    }
  }, []);

  return {
    modalOpen,
    modalData,
    isDeleteMode,
    isEditMode,
    previewImage,
    handleModal,
    handleCloseModal,
    handleConfirmModal,
    handleInputChange,
    handleImageUpload,
    setModalData, // Exponer esta función si se necesita actualizar manualmente
  };
};

export default useModal;
