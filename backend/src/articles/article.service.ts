/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.model';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}

  async findArticlesById(keyword: string): Promise<Article[]> {
    return await this.articleModel.find({ title: new RegExp(keyword, 'i') }).exec();
  }

  async getAllPublishedArticles(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async createNewArticle(articleDto: Partial<Article>): Promise<Article> {
    const newArticle = new this.articleModel(articleDto);
    return await newArticle.save();
  }

  
  async approveArticleById(id: string): Promise<boolean> {
    const res = await this.articleModel.updateOne({ _id: id }, { $set: { approved: true, rejected: false } }).exec();
    return res.modifiedCount > 0;
  }

  async rejectArticleById(id: string): Promise<boolean> {
    const res = await this.articleModel.updateOne({ _id: id }, { $set: { approved: false, rejected: true } }).exec();
    return res.modifiedCount > 0;
  }
}
