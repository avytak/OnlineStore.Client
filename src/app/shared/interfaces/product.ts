export interface Product {
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  categoryId: number;
  image: string;
}
