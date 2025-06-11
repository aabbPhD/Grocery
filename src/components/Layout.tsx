import React from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import CategoriesBar from "./CategoriesBar"
import Modal from "./Modal"


export default function Layout() {
    const [modalOpened, setModalOpened] = React.useState(false);

	return (
		<div className='app'>
            <Header openModal={() => setModalOpened(true)}/>
            <div className="main-section">
                <div className="main-section-layout">
                    <CategoriesBar />
                    <div className="main-section-content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Modal 
                isActive={modalOpened}
                closeModal={() => setModalOpened(false)}
            />
        </div>
	)
}