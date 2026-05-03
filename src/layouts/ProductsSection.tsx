import UseProductContext from "../hooks/UseProductContext";
import OneProduct from "../components/OneProduct";

export default function ProductsSection() {
  const { productsList } = UseProductContext();

  return (
    <div className="m-5 ">
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {productsList.map((product) => (
          <li key={product.id}>
            <OneProduct product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
