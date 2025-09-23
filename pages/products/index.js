import { getProductsStore } from "@/services/productsStore";
import Image from "next/image";
import noImage from "../../assets/no-image.png";

function ProductsPage({ products }) {
  return (
    <div>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <article>
                <Image src={noImage} alt="no-image-icon"/>
              <h2>{p.name}</h2>
              <p>{(Number(p.price) * 1000).toLocaleString()} تومان</p>
              {p.quantity === 0 ? (
                <p style={{ color: "red" }}>ناموجود</p>
              ) : p.quantity < 5 ? (
                <p>موجودی: {Number(p.quantity)} عدد</p>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const data = await getProductsStore({ page: 1, limit: 10 });
  return {
    props: {
      products: data.data || [],
    },
    revalidate: 60,
  };
}

export default ProductsPage;
