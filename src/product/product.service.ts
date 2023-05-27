/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IntProduct } from './interfaces/product.interface';
import { IntSubCategory } from 'src/subcategories/interfaces/subcategory.interface';
import { IntCategory } from 'src/category/interfaces/category.interface';
import { UserEntity } from 'src/user/entities/user.entity';



@Injectable()
export class ProductService {
  constructor(@InjectModel('product') private ProductModel: Model<IntProduct>,@InjectModel('subcategories') private SubCategoryModel: Model<IntSubCategory>,@InjectModel('categories') private CategoryModel: Model<IntCategory>) { }
  async createProduct(CreateProductDto: CreateProductDto,user:UserEntity): Promise<IntProduct> {
      if (!user || !user._id) {
    throw new Error('Invalid user object');
    
  }
   const data = Object.assign(CreateProductDto, { user: user._id });
    const newProduct = await new this.ProductModel(data);
    await this.SubCategoryModel.findByIdAndUpdate(CreateProductDto.subcategories,{$push:{product:newProduct}})
    return newProduct.save();
  }
  async updateProduct(ProductId: string, updateProduct: UpdateProductDto): Promise<IntProduct> {
    const existingProduct= await this.ProductModel.findByIdAndUpdate(ProductId, updateProduct, { new: true });
    if (!existingProduct) {
      throw new NotFoundException(`Product #${ProductId} not found`);
    }
    return existingProduct;
  }
  

  async findNewProducts(): Promise<IntProduct[]> {
    const NewProductData = await this.ProductModel.find().select("-__v").sort({ createdAt: -1 }).limit(1);
    if (!NewProductData || NewProductData.length == 0) {
      throw new NotFoundException(' new Products data not found!');
    }
    return NewProductData;
  }

  async getAllProductsbySubCategory(name:string): Promise<IntProduct[]> {
    const ProductDataBySubCategory = await this.ProductModel.find({subcategories:name}).select("-__v");
    if (!ProductDataBySubCategory || ProductDataBySubCategory.length == 0) {
      throw new NotFoundException('Products data by sub category not found!');
    }
    return ProductDataBySubCategory;
  }

  async getProductsByCategory(categoryId: string): Promise<IntProduct[]> {
    try {
      const category = await this.CategoryModel.findById(categoryId).exec();
      if (!category) {
        throw new Error(`Category with ID ${categoryId} not found.`);
      }

      const subcategories = await this.SubCategoryModel.find({ category: category._id }).exec();
      const subcategoryIds = subcategories.map(subcategory => subcategory._id);

      const products = await this.ProductModel.find({ subcategories: { $in: subcategoryIds } }).exec();

      return products;
    } catch (error) {
      throw new Error(`Failed to fetch products for category: ${categoryId}`);
    }
  }



  async getAllProducts(): Promise<IntProduct[]> {
    const ProductData = await this.ProductModel.find().populate("subcategories").select("-__v");
    if (!ProductData || ProductData.length == 0) {
      throw new NotFoundException('Products data not found!');
    }
    return ProductData;
  }





  async getProduct(ProductId: string): Promise<IntProduct> {
    const existingProduit = await this.ProductModel.findById(ProductId).exec();
    if (!existingProduit) {
      throw new NotFoundException(`Sub Category #${ProductId} not found`);
    }
    return existingProduit;
  }
  

  async getProductByName(name: string): Promise<IntProduct> {
    const existingProductByName = await this.ProductModel.findOne({name:name}).exec();
    if (!existingProductByName) {
      throw new NotFoundException(`Product #${name} not found`);
    }
    return existingProductByName;
  }

 



  async deleteProduct(ProductId: string): Promise<IntProduct> {
    const prod= await this.ProductModel.findById(ProductId);
    await this.SubCategoryModel.findByIdAndUpdate(prod.subcategories,{$pull:{product:prod._id} })
    const deletedproduct = await this.ProductModel.findByIdAndDelete(ProductId);

    
    if (!deletedproduct) {
      throw new NotFoundException(`Proudct #${deletedproduct} not found`);
    }
    return deletedproduct;
  }
}