/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { IntSubCategory } from './interfaces/subcategory.interface';
import { IntCategory } from 'src/category/interfaces/category.interface';

@Injectable()
export class SubCategoriesService {
  constructor(@InjectModel('subcategories') private SubCategoryModel: Model<IntSubCategory>,@InjectModel('categories') private CategoryModel: Model<IntCategory>) { }
  async createSubCategory(createSubCategoryDto: CreateSubcategoryDto): Promise<IntSubCategory> {
    const newSubCategory = await new this.SubCategoryModel(createSubCategoryDto);
    await this.CategoryModel.findByIdAndUpdate(createSubCategoryDto.category,{$push:{subcategories:newSubCategory}})
    return newSubCategory.save();
  }
  async updateSubCategory(SubCategoryId: string, updateSubCategoryDto: UpdateSubcategoryDto): Promise<IntSubCategory> {
    const existingSubCategory = await this.SubCategoryModel.findByIdAndUpdate(SubCategoryId, updateSubCategoryDto, { new: true });
    if (!existingSubCategory) {
      throw new NotFoundException(`SubCategory #${SubCategoryId} not found`);
    }
    return existingSubCategory;
  }
  async getAllSubCategorys(): Promise<IntSubCategory[]> {
    const SubCategoryData = await this.SubCategoryModel.find().populate("category").populate("product").select("-__v");
    if (!SubCategoryData || SubCategoryData.length == 0) {
      throw new NotFoundException('Categorys data not found!');
    }
    return SubCategoryData;
  }
  async getSubCategory(SubCategoryId: string): Promise<IntSubCategory> {
    const existingSubCategory = await this.SubCategoryModel.findById(SubCategoryId).exec();
    if (!existingSubCategory) {
      throw new NotFoundException(`Sub Category #${SubCategoryId} not found`);
    }
    return existingSubCategory;
  }


  async getSubCategoryByName(name: string): Promise<IntSubCategory> {
    const existingSubCategoryByName = await this.SubCategoryModel.findOne({name:name}).exec();
    if (!existingSubCategoryByName) {
      throw new NotFoundException(`Sub Category #${name} not found`);
    }
    return existingSubCategoryByName;
  }
  async getAllSubcategoriesbyCategory(name:string): Promise<IntSubCategory[]> {
    const SubDataByCategory = await this.SubCategoryModel.find({category:name}).select("-__v");
    if (!SubDataByCategory || SubDataByCategory.length == 0) {
      throw new NotFoundException('SubCategory data by category not found!');
    }
    return SubDataByCategory;
  }





  async deleteSubCategory(SubCategoryId: string): Promise<IntSubCategory> {
    const subcat= await this.SubCategoryModel.findById(SubCategoryId);
    await this.CategoryModel.findByIdAndUpdate(subcat.category,{$pull:{subcategories:subcat._id} })
    const deletedSubCategory = await this.SubCategoryModel.findByIdAndDelete(SubCategoryId);

    
    if (!deletedSubCategory) {
      throw new NotFoundException(`Category #${deletedSubCategory} not found`);
    }
    return deletedSubCategory;
  }
}