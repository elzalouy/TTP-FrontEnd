export interface SubCategory {
  _id: string;
  subCategory: string;
}
export interface Category {
  _id: string;
  category: string;
  subCategories?: string[];
  subCategoriesId?: SubCategory[];
  selectedSubCategory: SubCategory[];
  isDeleted?: boolean;
}

export interface CategoriesInterface {
  loading: boolean | null;
  categories: Category[];
  selectedCategory: Category | null;
  chosenCategories: Category[];
}
const categoriesState: CategoriesInterface = {
  loading: null,
  categories: [],
  selectedCategory: null,
  chosenCategories: [],
};
export default categoriesState;
