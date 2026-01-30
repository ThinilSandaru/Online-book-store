export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  thumbnails?: string[];
  category: string;
  language: string;
  publisher: string;
  isbn: string;
  pageCount: number;
  stockCount: number;
  description: string;
}
