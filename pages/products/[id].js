import { getProductsStore } from "@/services/productsStore";
import Head from "next/head";

function ProductDetail({ product }) {
  if (!product) {
    return <p>محصول یافت نشد</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | فروشگاه من</title>
        <meta
          name="description"
          content={`خرید ${product.name} با قیمت ${(
            Number(product.price) * 1000
          ).toLocaleString()} تومان`}
        />
      </Head>
      <article>
        <h1>{product.name}</h1>
        <p>قیمت: {(Number(product.price) * 1000).toLocaleString()} تومان</p>
        {product.quantity === 0 ? (
          <p style={{ color: "red" }}>ناموجود</p>
        ) : product.quantity < 5 ? (
          <p>موجودی: {product.quantity} عدد</p>
        ) : (
          <p>موجودی کافی موجود است</p>
        )}
        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </p>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const data = await getProductsStore({ page: 1, limit: 10 });
  const paths = data.data.map((p) => ({
    params: { id: p.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  try {
    const data = await getProductsStore();
    const product = data.data.find((p) => p.id.toString() === params.id);

    return {
      props: {
        product: product || null,
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { product: null },
      revalidate: 60,
    };
  }
}

export default ProductDetail;
