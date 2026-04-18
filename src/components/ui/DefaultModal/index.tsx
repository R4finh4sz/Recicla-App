import { useDefaultModal } from '@/store/defaultModalStore';

import ModalBackdrop from '../Modais/ModalBackdrop';

export type DefaultModalProps = {
  title: string;
  message: string;
  confirmText: string;
  notice?: string;
  onConfirm?: () => Promise<void> | void;
  cancelText?: string;
  onCancel?: () => Promise<void> | void;
  successMessage?: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
};

const DefaultModal = () => {
  const { modal, closeModal, openModal } = useDefaultModal();

  if (!modal) {
    return null;
  }

  const handleConfirm = async () => {
    if (modal.onConfirm) {
      await modal.onConfirm();
    }

    closeModal();

    if (modal.successMessage) {
      setTimeout(() => {
        openModal({
          title: 'Sucesso!',
          message: modal.successMessage!,
          confirmText: 'Entendi',
          variant: 'success',
        });
      }, 300);
    }
  };

  const handleCancel = async () => {
    if (modal.onCancel) {
      await modal.onCancel();
    }
    closeModal();
  };

  const buttons = [];

  if (modal.cancelText) {
    buttons.push({
      text: modal.cancelText,
      onPress: handleCancel,
      wired: true,
    });
  }

  buttons.push({
    text: modal.confirmText,
    onPress: handleConfirm,
  });

  return (
    <ModalBackdrop
      buttons={buttons}
      message={modal.message}
      title={modal.title}
      variant={modal.variant || 'success'}
      onClose={closeModal}
    />
  );
};

export default DefaultModal;
