import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import './reset.css'
import './App.scss'
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import ProductPage from './components/pages/ProductPage';
import ProfilePage from './components/pages/ProfilePage';
import NotFound from './components/pages/NotFound';
//import type { CartItemType } from './types/types';
import CategoryPage from './components/pages/CategoryPage';
import useProductStore from './store/products.store';
import { loginAction } from './components/Auth';


function App() {
	//const [cart, setCart] = React.useState<CartItemType[]>([]);

	const fetchProducts = useProductStore(state => state.fetchProducts);

	React.useEffect(() => {
		fetchProducts();
	}, [])

	const router = createBrowserRouter(createRoutesFromElements(
		<Route element={
				<Layout />
			}>
			<Route 
				path="/" 
				element={<MainPage />} 
				action={loginAction}
			/>
			<Route 
				path="/:category" 
				element={<CategoryPage />} 
			/>
			<Route 
				path="/:category/:id" 
				element={<ProductPage />} 
			/>
			<Route 
				path="/profile" 
				element={<ProfilePage />} 
			/>
			<Route 
				path="*" 
				element={<NotFound />} 
			/>
		</Route>
	), {basename: '/Grocery'})

	return (
		<RouterProvider router={router} />
	)
}

export default App
