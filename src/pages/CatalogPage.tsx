import { useState } from "react";
import UseProductContext from "../hooks/UseProductContext";
import OneProduct from "../components/OneProduct";



export default function CatalogPage() {
  const { productsList, inputSearcher } = UseProductContext();
  const [category, setCategory] = useState<string>("");

  const filtered = productsList.filter((prod) => {
    const isCategoryMatch =
      category.trim() === "-" ||
      category === "" ||
      prod.category.toLowerCase() === category.trim().toLowerCase();

    let isSearchMatch = true;

    if (inputSearcher.trim().length > 2) {
      isSearchMatch = prod.name
        .toLowerCase()
        .includes(inputSearcher.trim().toLowerCase());
    }

    return isCategoryMatch && isSearchMatch;
  });

  if (filtered.length === 0) {
    return "No matches for your request.";
  }

  return (
    <div>
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="product-category"
          name="product-category"
          className="shadow-[0_0_25px_5px_rgba(255,180,0,0.4)] px-3 py-1 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] rounded-xl cursor-pointer uppercase duration-300  "
        >
          <option value="-">All Categories</option>
          <option value="ceiling">Ceiling</option>
          <option value="floor">Floor</option>
          <option value="wall">Wall</option>
          <option value="desktop">Desktop</option>
        </select>

        <button className="ml-4 bg-amber-300/50 px-4 rounded-full uppercase text-olive-600 cursor-pointer hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-olive-800 active:scale-95">
          Find
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {filtered.map((prod) => (
          <li key={prod.id}>
            <OneProduct product={prod} />
          </li>
        ))}
      </ul>
    </div>
  );
}
