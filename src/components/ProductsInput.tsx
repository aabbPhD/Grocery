import React from 'react';
import SearchIcon from './svg-icons/searchicon';
import CrossIcon from './svg-icons/crossicon';
import type { ProductType } from '../types/types';
import getImageURL from '../utils/image_util';
import { useNavigate } from 'react-router-dom';
import { categoriesRuToEn } from '../utils/pathMap';
import useProductStore from '../store/products.store';
import useCategoryStore from "../store/category.store"



export default function ProductsInput() {
    const products = useProductStore(state => state.products);

    const [inputValue, setInputValue] = React.useState<string>('');
    const [inputProductsList, setInputProductsList] = React.useState<ProductType[]>([]);
    const [inputFocused, setInputFocused] = React.useState<boolean>(false);

    function strMatcher(sample: string): ProductType[] {
        if (!products || !sample) return [];
        return products.filter(item => item.name.toLowerCase().includes(sample.toLowerCase()));
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value: string = e.target.value;
        setInputValue(value);
        const matchingProducts = strMatcher(value).slice(0, 5);
        setInputProductsList(matchingProducts);
    }

    function clearInput() {
        setInputValue('');
        setInputProductsList([]);
    }

    return(
        <div className='input-wrapper'>
            <input 
                type='text'
                placeholder='Поиск' 
                value={inputValue}
                onChange={handleInput}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
            />
            <SearchIcon />
            {inputValue !== '' && <div onClick={clearInput}><CrossIcon /></div>}
            <MatchingProductsList 
                clearInput={clearInput}
                inputFocused={inputFocused}
                inputProductsList={inputProductsList}
            />
        </div>
    )
}



type MatchingProductsListProps = {
    clearInput: () => void,
    inputFocused: boolean,
    inputProductsList: ProductType[],
}


const MatchingProductsList = ({clearInput, inputFocused, inputProductsList}: MatchingProductsListProps) => {
    const navigate = useNavigate();

    const resetCategories = useCategoryStore(state => state.resetCategories);

    function goToProductPage(product: ProductType) {
        navigate(`/${categoriesRuToEn[product.category]}/${product.id}`);
        clearInput();
        resetCategories();
    }

    const inputProductsListItems = inputProductsList.map(item => {
        return  <li key={item.id} onMouseDown={() => goToProductPage(item)}>
                    <img src={getImageURL(item.image)}/>
                    <span>{item.name}</span>
                </li>
    })

    return(
        <>
            {(inputProductsListItems.length > 0 && inputFocused) && 
            <ul className='matching-products'>{inputProductsListItems}</ul>}
        </>
    )
}