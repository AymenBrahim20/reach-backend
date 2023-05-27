/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post,UseGuards, Put, Res } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin,Role.Member)
  async createReviews(@Res() response, @Body() CreateReviewDto: CreateReviewDto, ) {
    try {

      const newReview = await this.reviewService.createReview(CreateReviewDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Review has been created successfully',
        status: HttpStatus.OK,
        data: newReview
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Review not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  
  async updatereview(@Res() response, @Param('id')ReviewId: string, @Body() updateReview: UpdateReviewDto) {
    try {
     
      const existingReview = await this.reviewService.updateReview(ReviewId, updateReview);
      return response.status(HttpStatus.OK).json({
        message: 'Review has been successfully updated',
        data: existingReview,
        status: HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }



  @Get()
  async getreview(@Res() response) {
    try {
      const ReviewData = await this.reviewService.getAllReviews();
      return response.status(HttpStatus.OK).json({
        message: 'All Reviews data found successfully', status: HttpStatus.OK, data: ReviewData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }


  @Get('reviewbyproduct/:id')
  async getAllReviewsByProductId(@Res() response,@Param('id') productId: string) {
    try {
    const reviews = await this.reviewService.getAllReviewsByProductId(productId);
    return response.status(HttpStatus.OK).json({
      message: 'All Reviews by productId data found successfully', status: HttpStatus.OK, data: reviews,
    });
  } catch (err) {
    return response.status(err.status).json({
      message: err.response,
      status: HttpStatus.BAD_REQUEST,
      data: null
    });
  }
  }







  @Get(':id')
  async getreviewById(@Res() response, @Param('id') ReviewId: string) {
    try {
      const existingReview = await
        this.reviewService.getReview(ReviewId);
      return response.status(HttpStatus.OK).json({
        message: 'Review found successfully',
        data: existingReview,
        status:HttpStatus.OK
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  

  @Delete(':id')
  async deletereview(@Res() response, @Param('id') ReviewId: string) {
    try {
      const deletedReview = await this.reviewService.deleteReview(ReviewId);
      return response.status(HttpStatus.OK).json({
        message: 'Review deleted successfully',
        status: HttpStatus.OK,
        data: deletedReview,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
}
