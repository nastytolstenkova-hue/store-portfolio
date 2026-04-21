import UseProductContext from "../hooks/UseProductContext";
import OneProduct from "../components/OneProduct";

export default function CatalogPage() {
  const { category, setCategory, sortBy, setSortBy, sortedProducts } =
    UseProductContext();

  return (
    <div>
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="product-category"
          name="product-category"
          className="shadow-[0_0_25px_5px_rgba(255,180,0,0.4)] px-3 py-1 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] rounded-xl cursor-pointer uppercase duration-300 mr-3"
        >
          <option value="-">All Categories</option>
          <option value="ceiling">Ceiling</option>
          <option value="floor">Floor</option>
          <option value="wall">Wall</option>
          <option value="desktop">Desktop</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value as "a-z" | "z-a" | "risingPrice" | "lowerPrice",
            )
          }
          id="sortBy"
          name="sortBy"
          className="shadow-[0_0_25px_5px_rgba(255,180,0,0.4)] px-3 py-1 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] rounded-xl cursor-pointer uppercase duration-300  "
        >
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="risingPrice">Rising Price</option>
          <option value="lowerPrice">Lower Price</option>
        </select>
      </div>
      {sortedProducts.length === 0 ? (
        <p className="text-center mt-10">No matches for your request.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-2">
          {sortedProducts.map((prod) => (
            <li key={prod.id}>
              <OneProduct product={prod} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
