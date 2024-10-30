// src/types/Products.ts
export interface ProductDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  thumbnail: string;
}

export interface ICartItem {
  product: ProductDTO; // O item do carrinho deve ser do tipo ProductDTO
  quantity: number; // A quantidade do produto no carrinho
}