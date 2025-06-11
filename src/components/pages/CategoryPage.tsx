import React from "react";
import type { ProductType, CategoryType } from "../../types/types";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import { categoriesEnToRu } from "../../utils/pathMap";
import Category from "../Category";
import useProductStore from "../../store/products.store";



export default function CategoryPage() {
    const params = useParams<{ category: keyof typeof categoriesEnToRu }>();

    const products = useProductStore(state => state.products);
    const newProducts = useProductStore(state => state.newProducts);
    const popularProducts = useProductStore(state => state.popularProducts);

    const [chosenCategory, setChosenCategory] = React.useState<CategoryType | undefined>();

    React.useEffect(() => {
        if (products && newProducts && popularProducts && params?.category) {
            const allCategoryProducts = getAllCategoryProducts();
            setChosenCategory({
                name: categoriesEnToRu[params.category],
                products: allCategoryProducts,
            })
        }
    }, [products, newProducts, popularProducts, params.category])

    function getAllCategoryProducts(): ProductType[] {
        if (!params?.category || !(params.category in categoriesEnToRu)) return [];
        if (params.category === 'new') return newProducts;
        else if (params.category === 'popular') return popularProducts;
        else {
            const paramCategory = params.category;
            return products.filter(item => item.category === categoriesEnToRu[paramCategory]);
        }
    }

    return (
        products ?
        <>
            {params.category
                ? <Breadcrumbs  productCategory={categoriesEnToRu[params.category]} />
                : <Breadcrumbs />}
            {chosenCategory && 
            <div className="category-page">
                <Category 
                    category={chosenCategory}
                />
            </div>}
        </> :
        <h2>loading...</h2>
    )
}