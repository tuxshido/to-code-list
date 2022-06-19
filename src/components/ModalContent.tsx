import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Task } from "../models/models";
import { UserAuth } from "../context/AuthContext";
import { db } from "../models/Firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import {
    AiFillEdit,
    AiFillDelete,
    AiFillStepForward,
    AiFillCloseCircle,
    AiFillSave,
} from "react-icons/ai";
import "./modal.css";

type Props = {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: Task;
    toCode: Array<Task>;
    setToCode: React.Dispatch<React.SetStateAction<Array<Task>>>;
    nextStage: Array<Task>;
    setNextStage: React.Dispatch<React.SetStateAction<Array<Task>>>;
};

const ModalContent: React.FC<Props> = ({
    setModalOpen,
    task,
    toCode,
    setToCode,
    nextStage,
    setNextStage,
}) => {
    const [editTd, setEditTd] = useState<boolean>(false);
    const [editNt, setEditNt] = useState<boolean>(false);
    const [editDt, setEditDt] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(task.todo);
    const [editNote, setEditNote] = useState<string>(task.note);
    const [editDate, setEditDate] = useState<string>(task.delivery.toString());
    const { user } = UserAuth();

    const inputRefTd = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRefTd.current?.focus();
    }, [editTd]);

    const inputRefNt = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        inputRefNt.current?.focus();
    }, [editNt]);

    const inputRefDt = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRefDt.current?.focus();
    }, [editDt]);

    const handleEditTodo = async (id: number) => {
        //e.preventDefault();
        setToCode(
            toCode.map((task) =>
                task.id === id ? { ...task, todo: editTodo } : task
            )
        );
        if (user) {
            //const usersCollectionRef = collection(db, user.uid);
            const userDoc = doc(db, user.uid + "/" + id);
            const newFields = { todo: editTodo };
            await updateDoc(userDoc, newFields);
        }
        setEditTd(false);
    };

    const handleEditNote = async (id: number) => {
        //e.preventDefault();
        setToCode(
            toCode.map((task) =>
                task.id === id ? { ...task, note: editNote } : task
            )
        );
        if (user) {
            //const usersCollectionRef = collection(db, user.uid);
            const userDoc = doc(db, user.uid + "/" + id);
            const newFields = { note: editNote };
            await updateDoc(userDoc, newFields);
        }
        setEditNt(false);
    };

    const handleEditDate = async (id: number) => {
        //e.preventDefault();
        setToCode(
            toCode.map((task) =>
                task.id === id
                    ? { ...task, delivery: new Date(editDate) }
                    : task
            )
        );
        if (user) {
            //const usersCollectionRef = collection(db, user.uid);
            const userDoc = doc(db, user.uid + "/" + id);
            const delivery = new Date(editDate);
            const newFields = {
                year: delivery.getFullYear(),
                month: delivery.getMonth(),
                date: delivery.getDate(),
            };
            await updateDoc(userDoc, newFields);
        }
        setEditDt(false);
    };

    const handleDelete = async (id: number) => {
        setToCode(toCode.filter((task) => task.id !== id));
        if (user) {
            const userDoc = doc(db, user.uid + "/" + id);
            await deleteDoc(userDoc);
        }
    };

    const handleNextStage = async (task: Task, id: number) => {
        setToCode(toCode.filter((task) => task.id !== id));
        task.stage += 1;
        if (user) {
            const userDoc = doc(db, user.uid + "/" + id);
            const newFields = { stage: task.stage };
            await updateDoc(userDoc, newFields);
        }
        setNextStage([task, ...nextStage]);
    };

    return (
        <div className="modalContent">
            <span className="closeModal" onClick={() => setModalOpen(false)}>
                <AiFillCloseCircle />
            </span>
            <span className="task__heading">Task's Details</span>
            <div className="modal-lft">
                <span>Title :</span>
            </div>
            <div
                //onSubmit={(e) => handleEditTodo(e, task.id)}
                className="modal__single"
            >
                {editTd ? (
                    <input
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className="task__input--text"
                        ref={inputRefTd}
                    />
                ) : (
                    <span className="task__input--text">{task.todo}</span>
                )}
                <div>
                    {editTd ? (
                        <span
                            className="m-icon"
                            onClick={() => handleEditTodo(task.id)}
                        >
                            <AiFillSave />
                        </span>
                    ) : (
                        <span
                            className="m-icon"
                            onClick={() => {
                                if (!editTd) {
                                    setEditTd(!editTd);
                                }
                            }}
                        >
                            <AiFillEdit />
                        </span>
                    )}
                </div>
            </div>
            <div className="modal-lft">
                <span>Additionnal Comments :</span>
            </div>
            <div
                //onSubmit={(e) => handleEditNote(e, task.id)}
                className="modal__single"
            >
                {editNt ? (
                    <textarea
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        className="task__input--text"
                        cols={40}
                        ref={inputRefNt}
                    />
                ) : (
                    <span className="task__input--text">{task.note}</span>
                )}
                <div>
                    {editNt ? (
                        <span
                            className="m-icon"
                            onClick={() => handleEditNote(task.id)}
                        >
                            <AiFillSave />
                        </span>
                    ) : (
                        <span
                            className="m-icon"
                            onClick={() => {
                                if (!editNt) {
                                    setEditNt(!editNt);
                                }
                            }}
                        >
                            <AiFillEdit />
                        </span>
                    )}
                </div>
            </div>
            <div className="modal-lft">
                <span>Due Date :</span>
            </div>
            <div
                //onSubmit={(e) => handleEditDate(e, task.id)}
                className="modal__single"
            >
                {editDt ? (
                    <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="task__input--text"
                        //cols={40}
                        ref={inputRefDt}
                    />
                ) : (
                    <span className="task__input--text">
                        {task.delivery.getDate() +
                            "-" +
                            String(Number(task.delivery.getMonth()) + 1) +
                            "-" +
                            task.delivery.getFullYear()}
                        {/* .toString()} */}
                    </span>
                )}
                <div>
                    {editDt ? (
                        <span
                            className="m-icon"
                            onClick={() => handleEditDate(task.id)}
                        >
                            <AiFillSave />
                        </span>
                    ) : (
                        <span
                            className="m-icon"
                            onClick={() => {
                                if (!editDt) {
                                    setEditDt(!editDt);
                                }
                            }}
                        >
                            <AiFillEdit />
                        </span>
                    )}
                </div>
            </div>
            <div className="modalIcons">
                <span className="m-icon" onClick={() => setModalOpen(false)}>
                    <AiFillCloseCircle />
                </span>
                <span className="m-icon" onClick={() => handleDelete(task.id)}>
                    <AiFillDelete />
                </span>
                {task.stage !== 3 ? (
                    <span
                        className="m-icon"
                        onClick={() => handleNextStage(task, task.id)}
                    >
                        <AiFillStepForward />
                    </span>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default ModalContent;
