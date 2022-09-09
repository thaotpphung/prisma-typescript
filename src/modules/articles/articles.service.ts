import { Logger, Injectable } from '@nestjs/common';
import { Repository } from '../../database/db.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);
  constructor(private repository: Repository) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = await this.repository.article.create({
      data: createArticleDto,
    });
    return article;
  }

  async findDrafts() {
    const articles = await this.repository.article.findMany({
      where: { published: false },
    });
    return articles;
  }

  async findAll() {
    const articles = await this.repository.article.findMany({
      where: { published: true },
    });
    return articles;
  }

  async findOne(id: number) {
    const article = await this.repository.article.findUnique({ where: { id } });
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.repository.article.update({
      where: { id },
      data: updateArticleDto,
    });
    return article;
  }

  async remove(id: number) {
    const article = this.repository.article.delete({ where: { id } });
    return article;
  }
}
