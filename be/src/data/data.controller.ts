import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { DataService } from './data.service';
import { Datum, DatumInput } from '.';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  getAll() {
    return this.dataService.getData();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.dataService.getDatum(id);
  }

  @Post()
  create(@Body() data: DatumInput) {
    return this.dataService.createDatum(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: DatumInput & Partial<Datum>) {
    return this.dataService.updateDatum(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.dataService.deleteDatum(id);
  }
}
