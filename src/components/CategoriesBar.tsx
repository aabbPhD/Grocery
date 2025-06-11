import React from "react"
import { Link } from "react-router-dom"
import { categoriesRuToEn } from "../utils/pathMap"
import useCategoryStore from "../store/category.store"


export default function CategoriesBar() {
    const categoryOn = useCategoryStore(state => state.categoryOn);

    const categoriesListStyle = categoryOn ? 'categories-list' : 'categories-list collapsed';  

	return (
		<div className={categoriesListStyle}>
            <div className="categories-list-header">Категории</div>
            <CategoriesNavList />
        </div>
	)
}


const CategoriesNavList = React.memo(() => {
    const chosenCategory = useCategoryStore(state => state.chosenCategory);
    const chooseCategory = useCategoryStore(state => state.chooseCategory);

    const categoryKeys = Object.keys(categoriesRuToEn) as Array<keyof typeof categoriesRuToEn>;
    const categoryNavItems = categoryKeys.map((item, index) => {
        return <CategoryNavElement 
                    key={item}
                    item={item}
                    index={index}
                    isActive={index === chosenCategory}
                    chooseCategory={chooseCategory}
                />
    })

    return(
        <>{categoryNavItems}</>
    )
})



type CategoryNavElementPropsType = {
    item: string,
    index: number,
    isActive: boolean,
    chooseCategory: (id: number) => void,
}

const CategoryNavElement = React.memo(({item, index, isActive, chooseCategory}: CategoryNavElementPropsType) => {
    const linkStyle = (isActive) ? 'category-link chosen' : 'category-link';

    function handleClick(e: React.MouseEvent) {
        if (isActive) e.preventDefault();
        chooseCategory(index);
    }

    return <Link 
                className={linkStyle} 
                to={`/${categoriesRuToEn[item]}`} 
                onClick={handleClick} 
                key={item}>
                {item}
            </Link>
})