/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Query,Req, Post, Put,UseGuards, Res,UploadedFiles,UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import{diskStorage} from 'multer';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
/* import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiReponseEntity } from './dto/api.reponse'; */
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  @Post()
  /* @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin,Role.Seller) */
  @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 



  async createproduit(@Res() response, @Body() CreateproductDto: CreateProductDto, @Req()req ,userId:string, @UploadedFiles() files) {
    try {
      CreateproductDto.files = files.map(item =>item.filename);

      const newProduct = await this.productService.createProduct(CreateproductDto,req.user);
      return response.status(HttpStatus.CREATED).json({
        message: 'Product has been created successfully',
        status: HttpStatus.OK,
        data: newProduct
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error: Product not created!' + err,
        data: null
      });
    }
  }
  @Put('/:id')
 /*  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin,Role.Seller) */
  @UseInterceptors(
    FilesInterceptor("files",5,{
      storage: diskStorage({
        destination: "./upload",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  ) 
  async updateproduct(@Res() response, @Param('id')ProductId: string, @Body() updateProduct: UpdateProductDto, @UploadedFiles()  files) {
    try {
      if(files==undefined){
      const existingProduct = await this.productService.updateProduct(ProductId, updateProduct);
      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        data: existingProduct,
        status: HttpStatus.OK
      });
    }
    else {

      updateProduct.files = files.map(item =>item.filename);

      const existingProduct = await this.productService.updateProduct(ProductId, updateProduct);
      return response.status(HttpStatus.OK).json({
        message: 'Product has been successfully updated',
        data: existingProduct,
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

  async getproductByName(@Res() response, @Query('name') name: string) {
    try {
      const existingProductByName = await
        this.productService.getProductByName(name);
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully by name',
        data: existingProductByName,
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

  @Get('/subcategory')

  async getAllProductsbySubCategories(@Res() response, @Query('subcategory') name: string) {
    try {
      const existingProductBySubcategory = await
        this.productService.getAllProductsbySubCategory(name);
      return response.status(HttpStatus.OK).json({
        message: 'Products found successfully by subcategory',
        data: existingProductBySubcategory,
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

  @Get('/new')
  async getnewproduct(@Res() response) {
    try {
      const newProductData = await this.productService.findNewProducts();
      return response.status(HttpStatus.OK).json({
        message: 'All new Products data found successfully', status: HttpStatus.OK, data: newProductData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }
  @Get('/productbycategory/:id')
  async getProductsbyCategory(@Res() response, @Param('id') CategoryId: string) {
    try {
      const existingProductbycategory = await
        this.productService.getProductsByCategory(CategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Product by category found successfully',
        data: existingProductbycategory,
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
  async getproduct(@Res() response) {
    try {
      const ProductData = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        message: 'All Products data found successfully', status: HttpStatus.OK, data: ProductData,
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

  async getproductById(@Res() response, @Param('id') ProductId: string) {
    try {
      const existingProduct = await
        this.productService.getProduct(ProductId);
      return response.status(HttpStatus.OK).json({
        message: 'Product found successfully',
        data: existingProduct,
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
  /* @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(Role.Admin,Role.Seller) */
  async deleteproduct(@Res() response, @Param('id') ProductId: string) {
    try {
      const deletedProduct = await this.productService.deleteProduct(ProductId);
      return response.status(HttpStatus.OK).json({
        message: 'Product deleted successfully',
        status: HttpStatus.OK,
        data: deletedProduct,
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