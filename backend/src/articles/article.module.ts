/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleSchema } from './article.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://benjaminmatthews794:123abc@cluster0.croouva.mongodb.net/Test?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }])
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
