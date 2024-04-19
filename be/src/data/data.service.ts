import { Injectable } from '@nestjs/common';

import { DataDao } from './data.dao';
import { Datum, DatumInput } from '.';

@Injectable()
export class DataService {
  constructor(private readonly dataDao: DataDao) {}

  async getDatum(id: string) {
    return this.dataDao.get(id);
  }

  async getData() {
    return await this.dataDao.getAll();
  }

  async createDatum(data: DatumInput) {
    return this.dataDao.create(data);
  }

  async updateDatum(id: string, data: DatumInput & Partial<Datum>) {
    return this.dataDao.update(id, data);
  }

  async deleteDatum(id: string) {
    await this.dataDao.delete(id);
  }
}
