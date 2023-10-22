/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import { Document, ObjectId, model } from 'mongoose';

@Schema()
export class Article extends Document {
  @Expose()
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;

  id: string;

  @Prop({ required: true })
  title: string;

  @Prop([String])
  authors: string[];

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  publication_year: number;

  @Prop()
  doi: string;

  @Prop()
  summary: string;

  @Prop()
  linked_discussion: string;

  @Prop({ default: Date.now })
  updated_date: Date;

  @Prop([Number])
  ratings: number[];

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ default: 0 })
  totalRatings: number;

  @Prop({ default: false })
  approved: boolean;

  @Prop({ default: false })
  rejected: boolean;

  @Prop()
  SE_practice: string;

  @Prop()
  claim: string;

  @Prop()
  evidence: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
export const ArticleModel = model<Article>('Article', ArticleSchema);
