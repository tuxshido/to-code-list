import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Task } from "../models/models";
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

    const inputRefTd = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRefTd.current?.focus();
    }, [editTd]);

    const inputRefNt = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRefNt.current?.focus();
    }, [editNt]);

    const inputRefDt = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRefDt.current?.focus();
    }, [editDt]);

    const handleEditTodo = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setToCode(
            toCode.map((task) =>
                task.id === id ? { ...task, todo: editTodo } : task
            )
        );
        setEditTd(false);
    };

    const handleEditNote = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setToCode(
            toCode.map((task) =>
                task.id === id ? { ...task, note: editNote } : task
            )
        );
        setEditNt(false);
    };

    const handleEditDate = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setToCode(
            toCode.map((task) =>
                task.id === id
                    ? { ...task, delivery: new Date(editDate) }
                    : task
            )
        );
        setEditDt(false);
    };

    const handleDelete = (id: number) => {
        setToCode(toCode.filter((task) => task.id !== id));
    };

    const handleNextStage = (task: Task, id: number) => {
        setToCode(toCode.filter((task) => task.id !== id));
        task.stage += 1;
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
            <form
                onSubmit={(e) => handleEditTodo(e, task.id)}
                className="modal__single"
            >
                {editTd ? (
                    <input
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className="task__input--text"
                    />
                ) : (
                    <span className="task__input--text">{task.todo}</span>
                )}
                <div>
                    {editTd ? (
                        <button type="submit" className="m-b-icon">
                            <AiFillSave />
                        </button>
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
            </form>
            <div className="modal-lft">
                <span>Additionnal Comments :</span>
            </div>
            <form
                onSubmit={(e) => handleEditNote(e, task.id)}
                className="modal__single"
            >
                {editNt ? (
                    <textarea
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        className="task__input--text"
                        cols={40}
                    />
                ) : (
                    <span className="task__input--text">{task.note}</span>
                )}
                <div>
                    {editNt ? (
                        <button type="submit" className="m-b-icon">
                            <AiFillSave />
                        </button>
                    ) : (
                        <span
                            className="m-b-icon"
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
            </form>
            <div className="modal-lft">
                <span>Due Date :</span>
            </div>
            <form
                onSubmit={(e) => handleEditDate(e, task.id)}
                className="modal__single"
            >
                {editDt ? (
                    <textarea
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="task__input--text"
                        cols={40}
                    />
                ) : (
                    <span className="task__input--text">
                        {task.delivery.getDate() +
                            "-" +
                            task.delivery.getMonth() +
                            "-" +
                            task.delivery.getFullYear()}
                        {/* .toString()} */}
                    </span>
                )}
                <div>
                    {editDt ? (
                        <button type="submit" className="m-b-icon">
                            <AiFillSave />
                        </button>
                    ) : (
                        <span
                            className="m-b-icon"
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
            </form>
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
