import { useDisclosure } from '@nextui-org/react';
import { createContext, useCallback, useContext, useState } from 'react';

import { Datum } from '@/services/data';

import { useDatum } from '../hooks';

export interface DataModalState {
  itemId?: string;
  item?: Datum;
  isOpen: boolean;
  action: 'EDIT' | 'CREATE' | 'DELETE';

  openDataModal: (id: string, action?: DataModalState['action']) => void;
  closeDataModal: () => void;

  onOpenChange: () => void;
  onClose: () => void;
}

const DataModalContext = createContext({} as DataModalState);

const DataModalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [itemId, setItemId] = useState<DataModalState['itemId']>();
  const [action, setAction] = useState<DataModalState['action']>();
  const [item] = useDatum(itemId);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const openDataModal = useCallback(
    (id?: string, modalAction?: DataModalState['action']) => {
      setItemId(id);
      setAction(modalAction ?? (id ? 'EDIT' : 'CREATE'));
      onOpen();
    },
    [setItemId, setAction, onOpen],
  );
  const closeDataModal = useCallback(() => {
    setItemId(undefined);
    setAction(undefined);
    onClose();
  }, [setItemId, setAction, onClose]);

  const value = {
    itemId,
    item,
    isOpen,
    action,

    openDataModal,
    closeDataModal,

    onOpenChange,
    onClose,
  } as DataModalState;

  return (
    <DataModalContext.Provider value={value}>
      {children}
    </DataModalContext.Provider>
  );
};

export const useDataModal = () => useContext(DataModalContext);

export const connectDataModal =
  <P extends {}>(Comp: React.ComponentType<P>): React.FC<P> =>
  // eslint-disable-next-line react/display-name
  (props) => (
    <DataModalProvider>
      <Comp {...props} />
    </DataModalProvider>
  );
