/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IntReview } from './interfaces/review.interface';
@Injectable()
export class ReviewService {
  constructor(@InjectModel('review') private ReviewModel: Model<IntReview>) { }
  async createReview(CreateReviewDto: CreateReviewDto): Promise<IntReview> {
    const { productId, userId } = CreateReviewDto
    const existingReview = await this.ReviewModel.findOne({ productId, userId }).exec();
    if (existingReview) {
     
      throw new NotFoundException('You have already created a review for this product.');
    };
    const newReview = await new this.ReviewModel(CreateReviewDto);

    
    return newReview.save();
  }
  async updateReview(ReviewId: string, UpdateReviewDto: UpdateReviewDto): Promise<IntReview> {
    const existingReview = await this.ReviewModel.findByIdAndUpdate(ReviewId, UpdateReviewDto, { new: true });
    if (!existingReview) {
      throw new NotFoundException(`Review #${ReviewId} not found`);
    }
    return existingReview;
  }

  async getAllReviewsByProductId(productId: string): Promise<IntReview[]> {
    return this.ReviewModel.find({ productId }).exec();
  }

  async getAllReviews(): Promise<IntReview[]> {
    const ReviewData = await this.ReviewModel.find().select("-__v");
    if (!ReviewData || ReviewData.length == 0) {
      throw new NotFoundException('Review data not found!');
    }
    return ReviewData;
  }
  async getReview(ReviewId: string): Promise<IntReview> {
    const existingReview = await this.ReviewModel.findById(ReviewId).exec();
    if (!existingReview) {
      throw new NotFoundException(`Review #${ReviewId} not found`);
    }
    return existingReview;
  }


  
  async deleteReview(ReviewId: string): Promise<IntReview> {
    const deletedReview = await this.ReviewModel.findByIdAndDelete(ReviewId);
    if (!deletedReview) {
      throw new NotFoundException(`Review #${ReviewId} not found`);
    }
    return deletedReview;
  }
}
