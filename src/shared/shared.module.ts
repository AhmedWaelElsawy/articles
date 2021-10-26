import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { StringsService } from './strings/strings.service';

@Module({
  providers: [StringsService, HashingService],
  exports: [StringsService, HashingService]
})
export class SharedModule {}
