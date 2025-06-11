import { create } from 'zustand';
import type { ProductType } from '../types/types';
import { fetchProducts_fb } from '../firebase_api';

const POPULAR_PRODUCTS_AMOUNT = 20;

type ProductStoreType = {
    products: ProductType[],
    newProducts: ProductType[],
    popularProducts: ProductType[],
    fetchProducts: () => Promise<void>,
    updateDerivedProducts: () => void,
}

const useProductStore = create<ProductStoreType>((set, get) => ({
    products: [],
    newProducts: [],
    popularProducts: [],
    fetchProducts: async () => {
        const products = await fetchProducts_fb();
		if (products?.length) {
            set({products});
            const currentStore = get();
            currentStore.updateDerivedProducts();
        };
    },
    updateDerivedProducts: () => {
        const currentStore = get();
        const { products } = currentStore;
        set({
            newProducts: products.filter(item => item.new === true),
            popularProducts: [...products].sort((a, b) => b.sales - a.sales).slice(0, POPULAR_PRODUCTS_AMOUNT)
        })
    },
}));

export default useProductStore;