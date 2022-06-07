import React, { useState } from "react";
import "./App.css";
import InputTask from "./components/InputTask";
import TaskList from "./components/TaskList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Task } from "./models/models";

const App: React.FC = () => {
    const [task, setTask] = useState<string>("");
    const [toCode, setToCode] = useState<Array<Task>>([]);
    const [toTest, setToTest] = useState<Array<Task>>([]);
    const [toDeploy, setToDeploy] = useState<Array<Task>>([]);
    const [done, setDone] = useState<Array<Task>>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (task) {
            let oneWeekLater = new Date();
            oneWeekLater.setDate(oneWeekLater.getDate() + 7);
            setToCode([
                ...toCode,
                {
                    id: Date.now(),
                    position: toCode.length,
                    todo: task,
                    note: "",
                    stage: 0,
                    delivery: oneWeekLater,
                },
            ]);
            setTask("");
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        console.log(result);

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let add;
        let code = toCode;
        let test = toTest;
        let deploy = toDeploy;
        let todone = done;
        // Source Logic
        if (source.droppableId === "ToCodeList") {
            add = code[source.index];
            code.splice(source.index, 1);
        } else if (source.droppableId === "ToTestList") {
            add = test[source.index];
            test.splice(source.index, 1);
        } else if (source.droppableId === "ToDeployList") {
            add = deploy[source.index];
            deploy.splice(source.index, 1);
        } else {
            add = todone[source.index];
            todone.splice(source.index, 1);
        }

        // Destination Logic
        if (destination.droppableId === "ToCodeList") {
            add.stage = 0;
            code.splice(destination.index, 0, add);
        } else if (destination.droppableId === "ToTestList") {
            add.stage = 1;
            test.splice(destination.index, 0, add);
        } else if (destination.droppableId === "ToDeployList") {
            add.stage = 2;
            deploy.splice(destination.index, 0, add);
        } else {
            add.stage = 3;
            todone.splice(destination.index, 0, add);
        }

        setDone(todone);
        setToDeploy(deploy);
        setToTest(test);
        setToCode(code);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">To Code List</span>
                <InputTask
                    task={task}
                    setTask={setTask}
                    handleAdd={handleAdd}
                />
                <TaskList
                    toCode={toCode}
                    setToCode={setToCode}
                    toTest={toTest}
                    setToTest={setToTest}
                    toDeploy={toDeploy}
                    setToDeploy={setToDeploy}
                    done={done}
                    setDone={setDone}
                />
            </div>
        </DragDropContext>
    );
};

export default App;
