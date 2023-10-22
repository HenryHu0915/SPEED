/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Query, Options, SerializeOptions } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.model';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async createArticle(@Body() articleDto: Partial<Article>): Promise<boolean> {
    const article = await this.articleService.createArticle(articleDto); 
    return true;
  }

  @Get()
  async getAllArticles() {
    return await this.articleService.getAllArticles();
  }

  @Options()
  async corsTest() {
    return "";
  }

  @Get('search')
  async findArticlesByTitle(@Query('keyword') keyword: string) {
    return await this.articleService.findArticlesByTitle(keyword);
  }


  @Post('approveArticle')
  async approveArticle(@Query('_id') id: string): Promise<boolean> {
    return await this.articleService.approveArticleById(id);
  }

  @Post('rejectArticle')
  async rejectArticle(@Query('_id') id: string): Promise<boolean> {
    return await this.articleService.rejectArticleById(id);
  }
}
