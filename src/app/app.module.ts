import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Repository } from '../database/db.service';
import { ArticlesModule } from 'src/modules/articles/articles.module';

@Module({
  imports: [Repository, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
