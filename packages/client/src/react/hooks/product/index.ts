import { HypeItemReference, ProductFilters } from "@hype-charms/types";
import { useCallback, useEffect, useState } from "react";
import { filterProducts } from "../../../utils";

export const useFilterProducts = (products: HypeItemReference[] | null) => {
    const [filter, setFilter] = useState<ProductFilters>();
    const [filteredProducts, setFilteredProducts] = useState<HypeItemReference[]>();
    useEffect(() => {
        if (products) {
            setFilteredProducts(filterProducts(products, filter));
        } else {
            setFilteredProducts([]);
        }
    }, [products, filter]);
    const handleFilterChange = useCallback((key: ProductFilters) => {
        setFilter(key);
    }, [setFilter])
    return { handleFilterChange, filteredProducts }

}
export const useActiveProduct = () => {
    const [activeProduct, onSetActiveProduct] = useState<HypeItemReference | null>(null);
    const setActiveProduct = useCallback((product: HypeItemReference | null) => {
        onSetActiveProduct(product);
    }, [onSetActiveProduct]);
    return { activeProduct, setActiveProduct }
}