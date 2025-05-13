import { useState, useCallback } from 'react';
export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: '',
    message: '',
    confirmAction: () => {},
    cancelAction: () => {}
  });
  const openConfirmDialog = useCallback((config) => {
    setDialogConfig({
      title: config.title || 'Confirm',
      message: config.message || 'Are you sure?',
      confirmAction: config.onConfirm || (() => {}),
      cancelAction: config.onCancel || (() => {})
    });
    setIsOpen(true);
  }, []);
  const closeConfirmDialog = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleConfirm = useCallback(() => {
    dialogConfig.confirmAction();
    closeConfirmDialog();
  }, [dialogConfig, closeConfirmDialog]);
  const handleCancel = useCallback(() => {
    dialogConfig.cancelAction();
    closeConfirmDialog();
  }, [dialogConfig, closeConfirmDialog]);
  return {
    isOpen,
    dialogConfig,
    openConfirmDialog,
    closeConfirmDialog,
    handleConfirm,
    handleCancel
  };
};
