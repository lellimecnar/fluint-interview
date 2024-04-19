import DataAPI from './axios';

import { Datum } from '.';

async function save(id: string | undefined, data: Datum): Promise<Datum>;
async function save(data: Datum): Promise<Datum>;
async function save(...args: unknown[]) {
  const data = args.pop() as Datum;
  const id = args.pop() as string | undefined;

  if (id && typeof id === 'string') {
    return DataService.update(id, data);
  }

  return DataService.create(data);
}

export const DataService = {
  get: async (id: string): Promise<Datum> => (await DataAPI.get(id))?.data,
  getAll: async (): Promise<Datum[]> => (await DataAPI.get(''))?.data,
  create: async (data: Datum): Promise<Datum> =>
    (await DataAPI.post('', data))?.data,
  update: async (id: string, data: Datum): Promise<Datum> =>
    (await DataAPI.put(id, data))?.data,
  save,
  delete: async (id: string): Promise<void> => {
    await DataAPI.delete(id);
  },
};
