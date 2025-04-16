export interface SubcategoryItem {
  label: string;
  route: string;
}

export interface SubcategoryGroup {
  title: string;
  items: SubcategoryItem[];
}

export interface SubcategoryMap {
  [category: string]: SubcategoryGroup[];
}
