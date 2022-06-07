import React from "react";
import { createPortal } from "react-dom";
import "./modal.css";

type Props = {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalBkgColor: string;
};

const Modal: React.FC<Props> = ({
    modalOpen,
    setModalOpen,
    modalBkgColor,
    children,
}) => {
    if (!modalOpen) return null;

    return createPortal(
        <>
            <div onClick={() => setModalOpen(false)} className="overlay"></div>
            <div className={`wrapper ${modalBkgColor}`}>
                <div className="modalChildren">{children}</div>
            </div>
        </>,
        document.body
    );
};

export default Modal;
