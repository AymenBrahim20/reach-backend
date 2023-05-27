/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put, Res,UploadedFiles,UseInterceptors } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubCategoriesService } from './subcategories.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import{diskStorage} from 'multer';
/* import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiReponseEntity } from './dto/api.reponse'; */
import { SubcategoryEntity } from 'src/subcategories/entities/subcategory.entity';
@Controller('subcategories')
export class SubCategoriesController {
  constructor(private readonly subcategoriesService: SubCategoriesService) { }
  @Post()
  @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 


  async createSubCategories(@Res() response, @Body() CreateSubcategoryDto: CreateSubcategoryDto,@UploadedFiles() files) {
    try {
      CreateSubcategoryDto.files = files.map(item =>item.filename);

      const newSubCategory = await this.subcategoriesService.createSubCategory(CreateSubcategoryDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'SubCategory has been created successfully',
        status: HttpStatus.OK,
        data: newSubCategory
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: SubCategory not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 
  async updateSubCategories(@Res() response, @Param('id') SubCategoryId: string, @Body() updateSubCategoryDto: UpdateSubcategoryDto,@UploadedFiles()  files) {
    try {
      if(files==undefined){
      const existingSubCategory = await this.subcategoriesService.updateSubCategory(SubCategoryId, updateSubCategoryDto);
      return response.status(HttpStatus.OK).json({
        message: 'SubCategory has been successfully updated',
        data: existingSubCategory,
        status: HttpStatus.OK
      });

    }
     else{
      updateSubCategoryDto.files = files.map(item =>item.filename);

      const existingSubCategory = await this.subcategoriesService.updateSubCategory(SubCategoryId, updateSubCategoryDto);
      return response.status(HttpStatus.OK).json({
        message: 'SubCategory has been successfully updated',
        data: existingSubCategory,
        status: HttpStatus.OK
      });

     }


    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  @Get('/name')

  async SubCategoiesByName(@Res() response, @Query('name') name: string) {
    try {
      const existingSubCategoryByName = await
        this.subcategoriesService.getSubCategoryByName(name);
      return response.status(HttpStatus.OK).json({
        message: 'SubCategory found successfully by name',
        data: existingSubCategoryByName,
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
  @Get('/category')

  async getAllSubCategoriesbycategory(@Res() response, @Query('category') name: string) {
    try {
      const existingSubcategoryBycategory = await
        this.subcategoriesService.getAllSubcategoriesbyCategory(name);
      return response.status(HttpStatus.OK).json({
        message: 'SubCategories found successfully by category',
        data: existingSubcategoryBycategory,
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


  @Get()
  async getSubCategories(@Res() response) {
    try {
      const SubCategoryData = await this.subcategoriesService.getAllSubCategorys();
      return response.status(HttpStatus.OK).json({
        message: 'All SubCategorys data found successfully', status: HttpStatus.OK, data: SubCategoryData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  @Get('/:id')
 /*  @ApiParam({
    name: 'id',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: Number
  })
  @ApiResponse({
    status: 404,
    description: 'A post with given id does not exist.'
  }) */

  async getSubCategoryById(@Res() response, @Param('id') SubCategoryId: string) {
    try {
      const existingSubCategory = await
        this.subcategoriesService.getSubCategory(SubCategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Category found successfully',
        data: existingSubCategory,
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
  

  @Delete('/:id')
  async deleteSubCategories(@Res() response, @Param('id') SubCategoryId: string) {
    try {
      const deletedSubCategory = await this.subcategoriesService.deleteSubCategory(SubCategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'SubCategory deleted successfully',
        status: HttpStatus.OK,
        data: deletedSubCategory,
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