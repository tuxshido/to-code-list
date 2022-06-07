import React from "react";
import "./modal.css";
import {
    AiFillEdit,
    AiTwotoneSetting,
    AiFillDelete,
    AiFillStepForward,
    AiFillCloseCircle,
    AiFillSave,
} from "react-icons/ai";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";

type Props = {
    setModalInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalInfo: React.FC<Props> = ({ setModalInfo }) => {
    return (
        <div className="modalContent">
            <span className="closeModal" onClick={() => setModalInfo(false)}>
                <AiFillCloseCircle />
            </span>
            <span className="task__heading">About To Code List</span>
            <div className="aboutText">
                <p>
                    To-Code-list is an agile managment tool for your personnal
                    project. <br />
                    It is a fork of a To-Do-List project made by Piyush Agarwal
                    (Roadside Coder):{" "}
                    <a
                        href="https://github.com/piyush-eon/react-typescript-taskify"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        github.com/piyush-eon/react-typescript-taskify
                    </a>{" "}
                    <br /> With To-Code-List, you create a task to code, test
                    and deploy. You can drag'n drop it to another column. You
                    can edit its information and it will be circled in red if
                    the due date is over.
                </p>
            </div>
            <div className="modal-lft">
                <span>instructions :</span>
            </div>
            <table>
                <tr>
                    <td>
                        <span className="m-icon">
                            <AiFillCloseCircle />
                        </span>
                    </td>
                    <td>To close the window</td>
                    <td>Working</td>
                </tr>
                <tr>
                    <td>
                        <span className="m-icon">
                            <BiLogIn />
                        </span>
                    </td>
                    <td>To login</td>
                    <td>Not implemented</td>
                </tr>
                <tr>
                    <td>
                        <span className="m-icon">
                            <BiLogOut />
                        </span>
                    </td>
                    <td>To logout</td>
                    <td>Not implemented</td>
                </tr>
                <tr>
                    <td>
                        <span className="m-icon">
                            <BsFillInfoCircleFill />
                        </span>
                    </td>
                    <td>To get information</td>
                    <td>Working</td>
                </tr>
                <tr>
                    <td>
                        <span className="m-icon">
                            <AiFillSave />
                        </span>
                    </td>
                    <td>In the navbar, to save your session</td>
                    <td>Not implemented</td>
                </tr>{" "}
                <tr>
                    <td>
                        <span className="m-icon">
                            <AiTwotoneSetting />
                        </span>
                    </td>
                    <td>To view and edit a task</td>
                    <td>Working</td>
                </tr>
                <tr>
                    <td>
                        <span className="m-icon">
                            <AiFillEdit />
                        </span>
                    </td>
                    <td>To edit an information fied on a task</td>
                    <td>Working</td>
                </tr>
                <tr>
                    <td>
                        <span className="m-icon">
                            <AiFillSave />
                        </span>
                    </td>
                    <td>
                        In the settings, save your modifications to the current
                        session
                    </td>
                    <td>Working</td>
                </tr>{" "}
                <tr>
                    <td>
                        <span className="m-icon">
                            <AiFillEdit />
                        </span>
                    </td>
                    <td>To edit the Information on a task</td>
                    <td>Working</td>
                </tr>
                <tr>
                    <td>
                        <span className="m-icon">
                            <AiFillDelete />
                        </span>
                    </td>
                    <td>To delete a task</td>
                    <td>Working</td>
                </tr>
                <tr>
                    <td>
                        <span className="m-icon">
                            <AiFillStepForward />
                        </span>
                    </td>
                    <td>To move a task to the next column</td>
                    <td>Working</td>
                </tr>
            </table>
        </div>
    );
};

export default ModalInfo;
