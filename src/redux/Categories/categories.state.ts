export interface Category {
  _id?: string;
  category: string;
  subCategories?: string[];
  subCategoriesId?: string[];
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
