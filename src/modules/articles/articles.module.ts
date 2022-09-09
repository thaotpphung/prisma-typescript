import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { RepositoryModule } from '../../database/db.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [RepositoryModule],
})
export class ArticlesModule {}
