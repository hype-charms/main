import { Layout } from "../components/layout/layout.component";
import { MainComponent } from "../containers/home/main.component";
import { GetServerSideProps } from "next";
import { PackMetadata, ProductCategories, ProductMetadata, ProductType } from "../models/product.model";
import { MainMobileComponent } from "../containers/home/main-mobile.component";
import fetch from 'isomorphic-fetch'
import { PageLoaderComponent } from "../components/loader/loader.component";
import dynamic from "next/dynamic";
import { ModuleProps } from "../components/layout/module.component";
import { AllProductsModuleProps } from "../containers/home/all-products.component";
import { ProductCategoriesProps } from "../containers/home/products-categories.component";
import { StripeItemReference } from "@hype-charms/types";
import { ProductDisplayProps } from "../components/products/product-display";
import { useEffect } from "react";

const Module = dynamic<ModuleProps>(() => import("../components/layout/module.component").then((data) => data.Module))
const ProductsCategories = dynamic<ProductCategoriesProps>(() => import("../containers/home/products-categories.component").then((data) => data.ProductsCategories))
const AllProductsModule = dynamic<AllProductsModuleProps>(() => import("../containers/home/all-products.component").then((data) => data.AllProductsModule))
const ProductsDisplay = dynamic<ProductDisplayProps>(() => import("../components/products/product-display").then((data) => data.ProductDisplay))

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch(`${process.env.CLIENT_URL}/api/product`)
  const products = await data.json()
  return { props: { products: await products } }
}
interface HomePageProps {
  products: StripeItemReference<ProductMetadata>[]
}
export default function HomePage({ products }: HomePageProps) {

  if (!products) return (
    <Layout>
      <PageLoaderComponent height="h-[100vh]" />
    </Layout>
  )
  return (
    <>
      <Layout shrinkHeader>
        <>
          {products && <>
            <MainComponent
              products={products.filter(x => x.metadata?.type === ProductType.PRODUCT)}
              packs={products.filter(x => x.metadata?.type === ProductType.PACK) as unknown as StripeItemReference<PackMetadata>[]} />
            <MainMobileComponent />
          </>
          }
          {products && <div className="m-auto xl:max-w-[95vw] lg:max-w-[95vw] md:max-w-[95vw] max-w-full ">
            <AllProductsModule products={products} />
            <ProductsCategories categories={Object.values(ProductCategories).map(x => ({ title: x, href: `/products/${x}` }))} />
            <Module title="ALL ITEMS" href="/products">
              <main id="products-main" className="w-full">
                {products.map((product, idx) => <ProductsDisplay id=" home" width="xl:w-[19rem] lg:w-[17rem] md:w-[10rem] sm:w-[11rem] w-[10rem]" key={idx} product={product} />)}
              </main>
            </Module>
          </div>}
        </>
      </Layout>
    </>
  );
}
