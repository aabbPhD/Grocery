import { useNavigate } from 'react-router-dom'
import type { ProductType } from "../types/types"
import getImageURL from "../utils/image_util"
import BasketIcon from "./svg-icons/basketicon"
import { categoriesRuToEn } from '../utils/pathMap'
import useCategoryStore from "../store/category.store"


type ProductCardProps = {
    product: ProductType,
}

export default function ProductCard({product}: ProductCardProps) {
    const resetCategories = useCategoryStore(state => state.resetCategories);

    const navigate = useNavigate();

    function goToProductPage() {
        navigate(`/${categoriesRuToEn[product.category]}/${product.id}`);
        resetCategories();
    }

    function addToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        console.log('Добавили в корзину');
    }

    return (
        <div className="product-card" onClick={goToProductPage}>
            <div className="image-wrapper">
                <img src={getImageURL(product.image)}/>
            </div>
            <div className="product-card-content">
                <div className="product-card-info">
                    <p className="product-name">{product.name}</p>
                    <p className="price-per-unit">{product.price} ₽ / {product.unit}</p>
                    {product.new && <p className="new-product">Новинка</p>}
                </div>
                <button className='add-to-cart-button' onClick={addToCart}>
                    <BasketIcon />
                    <span>В корзину</span>
                </button>
            </div>
        </div>
    )
}