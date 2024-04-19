import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';

import { Datum } from '@/services/data';

import { useSaveDatum } from '../hooks';

import { useDataModal } from './context';

export const FormModalContent = () => {
  const { itemId, action, item, closeDataModal } = useDataModal();
  const [saveDatum] = useSaveDatum(itemId);
  const saveDataModal = useCallback(
    (values: Datum) => {
      saveDatum(values).then(() => {
        closeDataModal();
      });
    },
    [saveDatum, closeDataModal],
  );
  const initialValues = useMemo(() => item ?? ({} as Datum), [item]);

  return action ? (
    <Formik initialValues={initialValues} onSubmit={saveDataModal}>
      {() => (
        <Form>
          <ModalHeader>{action === 'CREATE' ? 'New' : 'Edit'} Data</ModalHeader>
          <ModalBody>
            <Field name="title">
              {({ field }: FieldProps<string>) => (
                <Input label="Title" {...field} />
              )}
            </Field>
            <Field name="description">
              {({ field }: FieldProps<string>) => (
                <Textarea label="Description" {...field} />
              )}
            </Field>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={closeDataModal}>
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {action === 'CREATE' ? 'Create' : 'Save'}
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  ) : null;
};
