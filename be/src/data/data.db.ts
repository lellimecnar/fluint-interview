import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'Data',
  autoCreate: true,
  timestamps: true,
  id: true,
})
export class Data {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;
}

export interface Datum extends Data {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type DatumInput = Omit<Datum, '_id' | 'id' | 'createdAt' | 'updatedAt'> &
  Partial<Datum>;

export const DataSchema = SchemaFactory.createForClass(Data);

export const DataCollection = {
  name: Data.name,
  schema: DataSchema,
};

export const FeatureDataModule = MongooseModule.forFeature(
  [DataCollection],
  'local',
);

export const RootDataModule = MongooseModule.forRoot(process.env.DATABASE_URL, {
  dbName: process.env.DATABASE_NAME || 'local',
  connectionName: 'local',
  maxPoolSize: 100,
});
