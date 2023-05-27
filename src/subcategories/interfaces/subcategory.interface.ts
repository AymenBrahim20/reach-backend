import { Document } from "mongoose";

export interface IntSubCategory extends Document{

readonly name:string;
/* readonly description:string;
 */readonly category:string;
 readonly files: string[];


}