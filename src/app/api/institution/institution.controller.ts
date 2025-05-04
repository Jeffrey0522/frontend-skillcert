import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { Institution } from './institution.entity';
import { CreateInstitutionDto } from './create-institution.dto';

@Controller('/api/v1/institutions')
export class InstitutionController {
  constructor(private readonly service: InstitutionService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
create(@Body() body: CreateInstitutionDto) {
  return this.service.create(body as any);
}

  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Institution>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
