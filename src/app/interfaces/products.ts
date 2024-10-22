
export interface Products {
  description: string,
  imageUrl: string,
  price: number,
  productName: string,
  ratings: number,
  stars: Stars[],
} 

export interface Stars{
  class: string,
  icon: string,
  id: string
}