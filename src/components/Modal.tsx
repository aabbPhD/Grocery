import '../modal.scss'
import React from "react";
import { createPortal } from "react-dom";
import Auth from './Auth';

type ModalPropsType = {
    isActive: boolean,
    closeModal: () => void
}


export default function Modal({isActive, closeModal}: ModalPropsType) {
    const portalDiv = document.getElementById('portal');
    if (!portalDiv) return null;

    const modalStyle = isActive ? 'modal-overlay active' : 'modal-overlay';

    return createPortal(
        <div className={modalStyle} onMouseDown={closeModal}>
            <div className="modal-content" onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}>
                <Auth 
                    isActive={isActive}
                    closeModal={closeModal}
                />
            </div>
        </div>, portalDiv
    )
}