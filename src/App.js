import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(0);
  const selectpageHandler = (p) => {
    if (p != page && p >= 1 && p <= totalpages) {
      setPage(p);
    }
  };
  const fetchProducts = async () => {
    const result = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await result.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalpages(data.total / 10);
    }
    console.log(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  // console.log(totalpages);
  return (
    <div>
      {totalpages > 0 && (
        <div className="products">
          {products.map((p, index) => (
            <div key={p.id} className="single_product">
              <img className="product_image" src={p.thumbnail} alt={p.title} />
              <span>{p.title}</span>
            </div>
          ))}
        </div>
      )}
      {totalpages > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectpageHandler(page - 1)}
            className={page > 1 ? "" : "pagination_disabled"}
          >
            ◀️
          </span>
          {[...Array(Math.ceil(totalpages))].map((_, i) => (
            <span
              onClick={() => selectpageHandler(i + 1)}
              className={`page_style ${i + 1 === page ? "selected" : ""}`}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => selectpageHandler(page + 1)}
            className={page < totalpages ? "" : "pagination_disabled"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
