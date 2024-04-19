import { Button, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useCallback } from 'react';

import { useDeleteDatum } from '../hooks';

import { useDataModal } from './context';

export const DeleteModalContent = () => {
  const { itemId, item, closeDataModal } = useDataModal();
  const [deleteDatum] = useDeleteDatum(itemId);
  const deleteDataModal = useCallback(() => {
    deleteDatum().then(() => {
      closeDataModal();
    });
  }, [deleteDatum, closeDataModal]);

  return (
    <>
      <ModalHeader>Delete Data</ModalHeader>
      <ModalBody>
        Are you super duper sure you want to delete &ldquo;{item?.title}&rdquo;
        forever?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={closeDataModal}>
          Cancel
        </Button>
        <Button color="danger" onPress={deleteDataModal}>
          DO IT!
        </Button>
      </ModalFooter>
    </>
  );
};
