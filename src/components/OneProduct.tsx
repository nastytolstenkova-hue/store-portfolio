export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  material: string;
  description: string;
  image: string;
  inStock: boolean;
  isNew: boolean;
}


export default function OneProduct({product}:{product:IProduct}){
  return (
    <div className="flex flex-col border border-zinc-200 rounded-md">
      <div className="w-full aspect-3/4 overflow-hidden p-2">
        <img src={product.image} className="w-full h-full  rounded-md object-cover transition-transform duration-500 hover:scale-105"/>
      </div>
      
      <div className="flex justify-center items-center min-h-[3.5rem] px-2 text-center">
        <h2 className="uppercase text-base font-mono  mx-auto tracking-tight line-clamp-2 leading-tight ">{product.name}</h2>

      </div>
      
      
      <p className="text-zinc-600 line-clamp-2 ">{product.description}</p>
      

      
      <div className="flex justify-between mx-2">
        <p>price:</p>
        <p>{product.price}</p>
      </div>
      
      <button className="flex justify-center items-center mx-auto mb-2 uppercase border border-zinc-400 rounded-md w-4/5 whitespace-nowrap">add to cart</button>
    </div>
  )
}