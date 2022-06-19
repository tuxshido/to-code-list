import React, { useState } from "react";
import { signInWithGoogle } from "../models/Firebase";
import "./styles.css";
import { UserAuth } from "../context/AuthContext";
import Modal from "./Modal";
import ModalInfo from "./ModalInfo";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";

interface props {
    //loggedIn: boolean;
    //     task: string;
    //setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    //     handleAdd: (e: React.FormEvent) => void;
}

const NavBar: React.FC<props> = () => {
    const [modalInfo, setModalInfo] = useState(false);

    const handleLogin = async () => {
        const { user } = await signInWithGoogle();
        //console.log(user);
        //console.log(user.displayName);
        //localStorage.setItem("name", name);
        //setLoggedIn(true);
    };

    const { user, logOut } = UserAuth();

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

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
                        {user?.displayName ? (
                            <span className="m-icon" onClick={handleSignOut}>
                                {user.displayName + " "}
                                <BiLogOut />
                            </span>
                        ) : (
                            <span
                                className="m-icon"
                                onClick={() => handleLogin()}
                            >
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
                </ul>
            </header>
        </>
    );
};

export default NavBar;
