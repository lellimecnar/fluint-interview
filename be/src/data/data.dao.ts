import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Data, Datum, DatumInput } from '.';

@Injectable()
export class DataDao {
  constructor(
    @InjectModel(Data.name, 'local')
    private dataModel: Model<Datum>,
  ) {}

  async get(id: string): Promise<Datum> {
    return this.dataModel.findById(id);
  }

  async getAll(): Promise<Datum[]> {
    return this.dataModel.find();
  }

  async create(data: Data): Promise<Datum> {
    return this.dataModel.create(data);
  }

  async update(id: string, data: DatumInput & Partial<Datum>): Promise<Datum> {
    return this.dataModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<void> {
    await this.dataModel.deleteOne({ _id: id });
  }
}
