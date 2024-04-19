import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Button,
} from '@nextui-org/react';

import { useData } from './hooks';
import { DataModal, useDataModal } from './DataModal';
import { DataCell } from './DataCell';
import { Plus } from '../Icon';

const columns = [
  { key: 'title', label: 'Title', sortable: false },
  { key: 'actions', label: null },
];

export const DataTable = () => {
  const modalProps = useDisclosure();
  const [data] = useData();
  const { openDataModal } = useDataModal();

  return (
    <>
      <DataModal />
      <Table
        topContent={
          <div className="flex gap-2 justify-end items-center">
            <Button
              startContent={<Plus />}
              onPress={() => openDataModal('', 'CREATE')}
            >
              Add Datum
            </Button>
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(col) => (
            <TableColumn
              key={col.key}
              align={col.key === 'actions' ? 'end' : 'start'}
              allowsSorting={!!col.sortable}
              width={col.key === 'actions' ? 0 : '100%'}
            >
              {col.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data ?? []} emptyContent={'No data to display'}>
          {(item) => (
            <TableRow key={item._id}>
              {(itemKey) => (
                <TableCell>
                  <DataCell item={item} itemKey={itemKey} {...modalProps} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
