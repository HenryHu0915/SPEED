/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Query, Options } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.model';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async createNewArticle(@Body() articleData: Partial<Article>): Promise<boolean> {
    const article = await this.articleService.createNewArticle(articleData); 
    return true;
  }

  @Get()
  async getAllPublishedArticles() {
    return await this.articleService.getAllPublishedArticles();
  }

  @Options()
  async corsTest() {
    return "";
  }

  @Get('search')
  async findArticlesById(@Query('keyword') keyword: string) {
    return await this.articleService.findArticlesById(keyword);
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
