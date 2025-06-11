import { create } from 'zustand';


type CategoryStoreType = {
    categoryOn: boolean,
    toggleCategory: () => void,
    chosenCategory: number,
    chooseCategory: (id: number) => void,
    resetCategories: () => void,
}

const useCategoryStore = create<CategoryStoreType>((set) => ({
    categoryOn: false,
    toggleCategory: () => {set(state => ({categoryOn: !state.categoryOn}))},
    chosenCategory: -1,
    chooseCategory: (id) => {set({chosenCategory: id})},
    resetCategories: () => {set({categoryOn: false, chosenCategory: -1})},
}));

export default useCategoryStore;