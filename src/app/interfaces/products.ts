
export interface Products {
  id: string,
  description: string,
  imageUrl: string,
  price: number,
  productName: string,
  ratings: number,
  stars: Stars[],
  quantity? : number,
  userId? : string
} 

export interface Stars{
  class: string,
  icon: string,
  id: string
}