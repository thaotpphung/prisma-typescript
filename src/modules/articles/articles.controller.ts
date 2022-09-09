import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { PrismaClientExceptionFilter } from '../../shared/filters/prisma-client-exception.filter';

@Controller('articles')
@ApiTags('articles')
@UseFilters(PrismaClientExceptionFilter)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts() {
    return await this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);

    if (!article) {
      throw new NotFoundException(`Could not find article with ${id}.`);
    }
    return article;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.remove(id);
  }
}
