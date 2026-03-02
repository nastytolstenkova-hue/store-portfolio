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

export default function OneCartProduct({product}:{product:IProduct}){
  return (
    <div className="grid grid-cols-2 ">
      <div>
        <img src={product.image} alt={product.name} className="w-full h-full  rounded-md object-cover aspect-3/4 p-2 "/>
      </div>
      <div>
        <h2>{product.name}</h2>
        <p>{product.name}</p>
        <div>
          <p>Price</p>
          <div>
            <button>+</button>
            <p></p>
            <button>-</button>
          </div>
        </div>
        <div>
          <p></p>
          <button>Remove</button>
        </div>
      </div>
    </div>
  )
}