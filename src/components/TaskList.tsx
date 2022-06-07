import React from "react";
import { Task } from "../models/models";
import SingleTask from "./SingleTask";
import { Droppable } from "react-beautiful-dnd";

interface props {
    toCode: Array<Task>;
    setToCode: React.Dispatch<React.SetStateAction<Array<Task>>>;
    toTest: Array<Task>;
    setToTest: React.Dispatch<React.SetStateAction<Array<Task>>>;
    toDeploy: Array<Task>;
    setToDeploy: React.Dispatch<React.SetStateAction<Array<Task>>>;
    done: Array<Task>;
    setDone: React.Dispatch<React.SetStateAction<Array<Task>>>;
}

const TaskList: React.FC<props> = ({
    toCode,
    setToCode,
    toTest,
    setToTest,
    toDeploy,
    setToDeploy,
    done,
    setDone,
}) => {
    return (
        <div className="container">
            <Droppable droppableId="ToCodeList">
                {(provided, snapshot) => (
                    <div
                        className={`tasks ${
                            snapshot.isDraggingOver
                                ? "dragtocode"
                                : "dragoffcode"
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="task__heading">To Code</span>
                        {toCode?.map((task, index) => (
                            <SingleTask
                                index={index}
                                toCode={toCode}
                                task={task}
                                key={task.id}
                                setToCode={setToCode}
                                nextStage={toTest}
                                setNextStage={setToTest}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="ToTestList">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`tasks  ${
                            snapshot.isDraggingOver
                                ? "dragtotest"
                                : "dragofftest"
                        }`}
                    >
                        <span className="task__heading">To Test</span>
                        {toTest?.map((task, index) => (
                            <SingleTask
                                index={index}
                                toCode={toTest}
                                task={task}
                                key={task.id}
                                setToCode={setToTest}
                                nextStage={toDeploy}
                                setNextStage={setToDeploy}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="ToDeployList">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`tasks  ${
                            snapshot.isDraggingOver
                                ? "dragtodeploy"
                                : "dragoffdeploy"
                        }`}
                    >
                        <span className="task__heading">To Deploy</span>
                        {toDeploy?.map((task, index) => (
                            <SingleTask
                                index={index}
                                toCode={toDeploy}
                                task={task}
                                key={task.id}
                                setToCode={setToDeploy}
                                nextStage={done}
                                setNextStage={setDone}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="DoneList">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`tasks  ${
                            snapshot.isDraggingOver
                                ? "dragtodone"
                                : "dragoffdone"
                        }`}
                    >
                        <span className="task__heading">Completed</span>
                        {done?.map((task, index) => (
                            <SingleTask
                                index={index}
                                toCode={done}
                                task={task}
                                key={task.id}
                                setToCode={setDone}
                                nextStage={done}
                                setNextStage={setDone}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TaskList;
