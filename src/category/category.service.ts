/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-Category.dto';
import { UpdateCategoryDto } from './dto/update-Category.dto';
import { IntCategory } from './interfaces/category.interface';
@Injectable()
export class CategoriesService {
  constructor(@InjectModel('categories') private CategoryModel: Model<IntCategory>) { }
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<IntCategory> {
    const newCategory = await new this.CategoryModel(createCategoryDto);
    return newCategory.save();
  }
  async updateCategory(CategoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<IntCategory> {
    const existingCategory = await this.CategoryModel.findByIdAndUpdate(CategoryId, updateCategoryDto, { new: true });
    if (!existingCategory) {
      throw new NotFoundException(`Category #${CategoryId} not found`);
    }
    return existingCategory;
  }
  async getAllCategories(): Promise<IntCategory[]> {
    const CategoryData = await this.CategoryModel.find().populate("subcategories").select("-__v");
    if (!CategoryData || CategoryData.length == 0) {
      throw new NotFoundException('Categorys data not found!');
    }
    return CategoryData;
  }
  async getCategory(CategoryId: string): Promise<IntCategory> {
    const existingCategory = await this.CategoryModel.findById(CategoryId).exec();
    if (!existingCategory) {
      throw new NotFoundException(`Category #${CategoryId} not found`);
    }
    return existingCategory;
  }


  async getCategoryByName(name: string): Promise<IntCategory> {
    const existingCategoryByName = await this.CategoryModel.findOne({name:name}).exec();
    if (!existingCategoryByName) {
      throw new NotFoundException(`Category #${name} not found`);
    }
    return existingCategoryByName;
  }
  async deleteCategory(CategoryId: string): Promise<IntCategory> {
    const deletedCategory = await this.CategoryModel.findByIdAndDelete(CategoryId);
    if (!deletedCategory) {
      throw new NotFoundException(`Category #${CategoryId} not found`);
    }
    return deletedCategory;
  }
}