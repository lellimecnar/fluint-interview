import { Modal, ModalContent } from '@nextui-org/react';

import { useDataModal } from './context';
import { FormModalContent } from './FormModalContent';
import { DeleteModalContent } from './DeleteModalContent';

export const DataModal: React.FC = () => {
  const { isOpen, action, onOpenChange, closeDataModal } = useDataModal();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={closeDataModal}>
      <ModalContent>
        {() => (
          <>
            {action === 'EDIT' && <FormModalContent />}
            {action === 'CREATE' && <FormModalContent />}
            {action === 'DELETE' && <DeleteModalContent />}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
