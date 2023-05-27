/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put,UseGuards, Res,UploadedFiles,UseInterceptors } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-Category.dto';
import { UpdateCategoryDto } from './dto/update-Category.dto';
import { CategoriesService } from './category.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import{diskStorage} from 'multer';
/* import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiReponseEntity } from './dto/api.reponse'; */
import { request } from 'http';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
   @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 


  
  async createCategory(@Res() response, @Body() createCategoryDto: CreateCategoryDto, @UploadedFiles() files) {
    try {

      createCategoryDto.files = files.map(item =>item.filename);
      const newCategory = await this.categoriesService.createCategory(createCategoryDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Category has been created successfully',
        status: HttpStatus.OK,
        data: newCategory
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Category not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 
  async updateCategory(@Res() response, @Param('id') CategoryId: string, @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFiles()  files) {
    try {
      if(files==undefined){
        const existingCategory = await this.categoriesService.updateCategory(CategoryId, updateCategoryDto);
        return response.status(HttpStatus.OK).json({
          message: 'Category has been successfully updated',
          data: existingCategory,
          status: HttpStatus.OK
        });

      }

      else {
        updateCategoryDto.files = files.map(item =>item.filename);
        const existingCategory = await this.categoriesService.updateCategory(CategoryId, updateCategoryDto);
        return response.status(HttpStatus.OK).json({
          message: 'Category has been successfully updated',
          data: existingCategory,
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

  async CategoryByName(@Res() response, @Query('name') name: string) {
    try {
      const existingCategoryByName = await
        this.categoriesService.getCategoryByName(name);
      return response.status(HttpStatus.OK).json({
        message: 'Category found successfully by name',
        data: existingCategoryByName,
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
  async getCategories(@Res() response) {
    try {
      const CategoryData = await this.categoriesService.getAllCategories();
      return response.status(HttpStatus.OK).json({
        message: 'All Categorys data found successfully', status: HttpStatus.OK, data: CategoryData,
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

  async getCategory(@Res() response, @Param('id') CategoryId: string) {
    try {
      const existingCategory = await
        this.categoriesService.getCategory(CategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Category found successfully',
        data: existingCategory,
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
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteCategory(@Res() response, @Param('id') CategoryId: string) {
    try {
      const deletedCategory = await this.categoriesService.deleteCategory(CategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Category deleted successfully',
        status: HttpStatus.OK,
        data: deletedCategory,
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