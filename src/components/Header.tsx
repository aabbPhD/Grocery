import CategoryIcon from './svg-icons/categoryicon';
import CrossIcon from './svg-icons/crossicon';
import BasketIcon from './svg-icons/basketicon';
import LoginIcon from './svg-icons/loginicon';
import ProductsInput from './ProductsInput';
import useCategoryStore from "../store/category.store"
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth.store';



type HeaderPropsType = {
    openModal: () => void
}

export default function Header({openModal}: HeaderPropsType) {
    return (
        <div className='header'>
            <div className='header-content'>
                <GroceryLogo />
                <ToggleCategoriesButton />
                <ProductsInput />
                <div className='header-actions'>
                    <BasketIcon />
                    <span>Корзина</span>
                </div>
                <LoginButton openModal={openModal}/>
            </div> 
        </div>
    )
}


const GroceryLogo = () => {
    const resetCategories = useCategoryStore(state => state.resetCategories);

    return (
        <Link 
            to='/'
            onClick={() => resetCategories()}
        >
            <span className='logo'>Наш магазин</span>
        </Link>
    )
}



const ToggleCategoriesButton = () => {
    const categoryOn = useCategoryStore(state => state.categoryOn);
    const toggleCategory = useCategoryStore(state => state.toggleCategory);
    const svgIcon = categoryOn ? <CrossIcon /> : <CategoryIcon />;

    return (
        <div className='header-categories' onClick={toggleCategory}>
            {svgIcon}
            <span>Каталог</span>
        </div>
    )
}



type LoginButtonPropsType = {
    openModal: () => void
}

const LoginButton = ({openModal}: LoginButtonPropsType) => {
    const { loggedIn } = useAuthStore();
    const navigate = useNavigate();

    function goToProfilePage() {
        navigate('/Profile');
    }

    return (
        <div className='header-actions' onClick={loggedIn ? goToProfilePage : openModal}>
            <LoginIcon />
            <span>{loggedIn ? 'Профиль' : 'Войти'}</span>
        </div>
    )
}

