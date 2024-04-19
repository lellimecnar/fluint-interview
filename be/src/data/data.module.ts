import { Module } from '@nestjs/common';

import { FeatureDataModule, RootDataModule } from './data.db';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { DataDao } from './data.dao';

@Module({
  imports: [RootDataModule, FeatureDataModule],
  controllers: [DataController],
  providers: [DataService, DataDao],
})
export class DataModule {}
