import React, { useState } from "react";
import "./styles.css";
import Modal from "./Modal";
import ModalInfo from "./ModalInfo";
import { AiFillSave } from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";

interface props {
    loginStatus: boolean;
    //     task: string;
    //     setTask: React.Dispatch<React.SetStateAction<string>>;
    //     handleAdd: (e: React.FormEvent) => void;
}

const NavBar: React.FC<props> = (loginStatus) => {
    const [modalInfo, setModalInfo] = useState(false);

    return (
        <>
            <Modal
                modalOpen={modalInfo}
                setModalOpen={setModalInfo}
                modalBkgColor={"mainBkgColor"}
            >
                <ModalInfo setModalInfo={setModalInfo} />
            </Modal>
            <header className="header">
                <div>
                    <span className="heading">To Code List</span>
                </div>
                <ul className="navUl">
                    <li>
                        {!loginStatus ? (
                            <span className="m-icon">
                                <BiLogOut />
                            </span>
                        ) : (
                            <span className="m-icon">
                                <BiLogIn />
                            </span>
                        )}
                    </li>
                    <li>
                        <span
                            className="m-icon"
                            onClick={() => setModalInfo(true)}
                        >
                            <BsFillInfoCircleFill />
                        </span>
                    </li>
                    <li>
                        {!loginStatus ? (
                            <span className="m-icon">
                                <AiFillSave />
                            </span>
                        ) : (
                            ""
                        )}
                    </li>
                </ul>
            </header>
        </>
    );
};

export default NavBar;
