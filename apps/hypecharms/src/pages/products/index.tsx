import { GetServerSideProps } from 'next'
import React from "react";
import { HypeItemReference } from "@hype-charms/types";
import { LayoutComponent, Module, PopoverComponent, ProductDisplayComponent, ProductPageWrapperComponent, useActiveProduct, useFilterProducts } from '@hype-charms/client';
import { eventheader_content, header_content, subheader_content } from '../../constants/header';
import { product_page_data } from '../../constants/product-page';
import { PopoverPosition } from '@hype-charms/client/dist/src/react/models/popover';
import { useHeaderControls } from '../../hooks/header-controls';

export const useProductsPage = (products: HypeItemReference[]) => {
  const { handleFilterChange, filteredProducts } = useFilterProducts(products)
  const { activeProduct, setActiveProduct } = useActiveProduct();
  return { handleFilterChange, filteredProducts, activeProduct, setActiveProduct }
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const products: HypeItemReference[] | null = await shop.products.fetchAllProducts(100)
  //   .then(data => data.map((data) => MapShopifyProductReferencesToHypeItemReference(data.node)))
  //   .catch(err => {
  //     console.log(err);
  //     return null
  //   });
  const products = null;
  return { props: { products } }
}
interface ProductPageProps {
  products: HypeItemReference[] | null
}
export default function ProductsPage({ products }: ProductPageProps) {
  const { handleFilterChange, filteredProducts, activeProduct, setActiveProduct } = useProductsPage(products);
  const { handleCartClick, handleProfileClick } = useHeaderControls();
  return (
    <LayoutComponent
      onCartClick={handleCartClick}
      onProfileClick={handleProfileClick}
      eventheader_content={eventheader_content}
      subheader_content={subheader_content}
      header_content={header_content}>
      <>
        <ProductPageWrapperComponent
          loadedItemQuantity={filteredProducts?.length}
          title={product_page_data["all-products"].header}
          description={product_page_data["all-products"].description}
          image={product_page_data["all-products"].image}
          onFilterChange={handleFilterChange}
        >
          {products ? <Module>
            <main id="products-main" className="w-full">
              {filteredProducts.map((product, idx) => <ProductDisplayComponent
                onClick={setActiveProduct}
                size="md"
                id="product-page"
                key={idx}
                product={product}
              />)}
            </main>
          </Module> : <>no items</>}
        </ProductPageWrapperComponent>
        <PopoverComponent
          title=""
          open={!!activeProduct}
          onClose={() => setActiveProduct(null)}
          position={PopoverPosition.center}>
          <div className="w-[60vw] h-[60vh]">
            {activeProduct && <ProductDisplayComponent id="0" product={activeProduct} size={'md'} />}
          </div>
        </PopoverComponent>
      </>
    </LayoutComponent>
  )
}
