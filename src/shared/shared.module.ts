import { Module } from '@nestjs/common';
import { StringsService } from './strings/strings.service';

@Module({
  providers: [StringsService],
  exports: [StringsService]
})
export class SharedModule {}
