import type { CategoryType } from "../../types/types";
import Category from "../Category";
import useProductStore from "../../store/products.store";


const TOP_PRODUCTS_AMOUNT = 4;

export default function MainPage() {
    const newProducts = useProductStore(state => state.newProducts);
    const popularProducts = useProductStore(state => state.popularProducts);

    const popularCategory: CategoryType = {
        name: 'Популярное',
        products: popularProducts,
    }

    const newCategory: CategoryType = {
        name: 'Новинки',
        products: newProducts,
    }

    return (
        <div className="main-page">
            <Category 
                category={{...newCategory, maxAmountRendered: TOP_PRODUCTS_AMOUNT}}
                showMoreProducts={true}
            />
            <Category 
                category={{...popularCategory, maxAmountRendered: TOP_PRODUCTS_AMOUNT}}
                showMoreProducts={true}
            />
        </div>
    )
}