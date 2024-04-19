import {
  Button,
  getKeyValue,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from '@nextui-org/react';

import { Pencil, Trash, DotsVertical } from '@/components/Icon';
import { Datum } from '@/services/data';

import { useDataModal } from './DataModal';

export const ActionCell: React.FC<{ itemId: string }> = ({ itemId }) => {
  const { openDataModal } = useDataModal();

  return (
    <div className="relative flex justify-end items-center gap-2">
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <DotsVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            onClick={() => openDataModal(itemId)}
            startContent={<Pencil />}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            startContent={<Trash />}
            onClick={() => openDataModal(itemId, 'DELETE')}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export const DataCell: React.FC<{ item: Datum; itemKey: unknown }> = ({
  item,
  itemKey,
}) => {
  switch (itemKey) {
    case 'actions':
      return <ActionCell itemId={item._id!} />;
    default:
      return getKeyValue(item, itemKey as keyof Datum);
  }
};
