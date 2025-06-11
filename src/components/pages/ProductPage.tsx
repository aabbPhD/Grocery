import React from "react";
import type { ProductType } from "../../types/types";
import { useParams } from "react-router-dom";
import getImageURL from "../../utils/image_util";
import BasketIcon from "../svg-icons/basketicon";
import Breadcrumbs from "../Breadcrumbs";
import { categoriesEnToRu } from "../../utils/pathMap";
import useProductStore from "../../store/products.store";



export default function ProductPage() {
    const params = useParams();

    const products = useProductStore(state => state.products);

    const [productData, setProductData] = React.useState<ProductType | undefined>(undefined);

    React.useEffect(() => {
        if (products && params?.category && params?.id) {
            const paramCategory = params.category;
            const fetchedProductData = products?.find(item => item.id === Number(params.id) && item.category === categoriesEnToRu[paramCategory]);
            setProductData(fetchedProductData);
        }      
    }, [products, params.id, params.category])

    function addToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        console.log('Добавили в корзину');
    }

    return (
        productData ? 
            <>
                <Breadcrumbs 
                    productCategory={productData.category}
                    productName={productData.name}
                />
                <div className="product-page">
                    <div className="left-col">
                        <h2 className="product-name">{productData.name}</h2>
                        <p className="price-per-unit">{productData.price} ₽ / {productData.unit}</p>
                        {productData.new && <p className="new-product">Новинка</p>}
                        <img src={getImageURL(productData.image)}/>
                        <button className='add-to-cart-button' onClick={addToCart}>
                            <BasketIcon />
                            <span>В корзину</span>
                        </button>
                    </div>
                    <div className="right-col">
                        <div className="product-description">
                            <h3>Описание</h3>
                            {productData.description}
                        </div>
                        {productData.composition && 
                        <div className="product-composition">
                            <h3>Состав</h3>
                            {productData.composition}
                        </div>}
                    </div>   
                </div>
            </> :
            <h2>loading...</h2>
    )
}