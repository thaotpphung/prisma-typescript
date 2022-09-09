import { Module } from '@nestjs/common';
import { Repository } from './db.service';

@Module({
  providers: [Repository],
  exports: [Repository],
})
export class RepositoryModule {}
