import React, { useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { Task } from "../models/models";
import Modal from "./Modal";
import ModalContent from "./ModalContent";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo: React.FC<{
    index: number;
    task: Task;
    toCode: Array<Task>;
    setToCode: React.Dispatch<React.SetStateAction<Array<Task>>>;
    nextStage: Array<Task>;
    setNextStage: React.Dispatch<React.SetStateAction<Array<Task>>>;
}> = ({ index, task, toCode, setToCode, nextStage, setNextStage }) => {
    const [modalOpen, setModalOpen] = useState(false);

    let modalBkgColor = "dragoffcode";
    if (task.stage === 1) {
        modalBkgColor = "dragofftest";
    } else if (task.stage === 2) {
        modalBkgColor = "dragoffdeploy";
    } else if (task.stage === 3) {
        modalBkgColor = "dragoffdone";
    }

    return (
        <>
            <Modal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalBkgColor={modalBkgColor}
            >
                <ModalContent
                    setModalOpen={setModalOpen}
                    task={task}
                    toCode={toCode}
                    setToCode={setToCode}
                    nextStage={nextStage}
                    setNextStage={setNextStage}
                />
            </Modal>
            <Draggable draggableId={task.id.toString()} index={index}>
                {(provided, snapshot) => (
                    <div
                        // onSubmit={(e) => handleEdit(e, task.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`todos__single ${
                            snapshot.isDragging ? "drag" : ""
                        } ${
                            task.delivery < new Date() && task.stage < 3
                                ? "alertBorder"
                                : ""
                        }`}
                    >
                        <span className="task__input--text">
                            {task.todo.length > 45
                                ? task.todo.slice(0, 42) + " ..."
                                : task.todo}
                        </span>
                        <div>
                            <span
                                className="icon"
                                onClick={() => setModalOpen(true)}
                            >
                                <AiTwotoneSetting />
                            </span>
                        </div>
                    </div>
                )}
            </Draggable>
        </>
    );
};

export default SingleTodo;
