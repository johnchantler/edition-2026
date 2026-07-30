import { getProducts, getSite } from "@venuecms/sdk-next";
import { connection } from "next/server";

import { Link } from "@/lib/i18n";

import { ListProduct } from "@/components/ListProduct";

export async function ProductsContent() {
  await connection();

  const [{ data: products }, { data: site }] = await Promise.all([
    getProducts({ limit: 2 }),
    getSite(),
  ]);

  if (!site) return null;

  const topProducts = products?.records.slice(0, 24);
  const moreProducts = products?.records.slice(4);

  return (
    <section className="py-20">
      <div className="grid grid-cols-1 gap-8 pb-20 sm:max-w-full sm:grid-cols-2 xl:grid-cols-2">
        {topProducts?.length
          ? topProducts.map((product) => (
              <ListProduct
                key={product.slug}
                featured={true}
                product={product}
                site={site}
              />
            ))
          : "No products found"}
      </div>
      {moreProducts?.length ? (
        <div className="grid grid-cols-2 gap-8 sm:max-w-full lg:grid-cols-[repeat(4,minmax(1rem,32rem))] xl:grid-cols-[repeat(6,minmax(1rem,32rem))]">
          {moreProducts.map((product) => (
            <ListProduct key={product.slug} product={product} site={site} />
          ))}
        </div>
      ) : null}
      <div className="w-full grid-cols-3">
        <Link
          className="flex w-full justify-center font-content text-sm text-highlight hover:translate-y-0.5 hover:text-secondary sm:relative sm:flex-row"
          href="/shop"
        >
          [ see all fönstret releases ]
        </Link>
      </div>
    </section>
  );
}
