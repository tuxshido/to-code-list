import React, { useState, useEffect } from "react";
import "./App.css";
import InputTask from "./components/InputTask";
import TaskList from "./components/TaskList";
import NavBar from "./components/NavBar";
import { UserAuth } from "./context/AuthContext";
import { db } from "./models/Firebase";
import {
    collection,
    getDocs,
    setDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Task } from "./models/models";

const App: React.FC = () => {
    //const [loggedIn, setLoggedIn] = useState(false);
    // const [userInfo, setuserInfo] = useState<Array<String>>([]);
    const [todo, setTodo] = useState<string>("");
    const [toCode, setToCode] = useState<Array<Task>>([]);
    const [toTest, setToTest] = useState<Array<Task>>([]);
    const [toDeploy, setToDeploy] = useState<Array<Task>>([]);
    const [done, setDone] = useState<Array<Task>>([]);
    const { user } = UserAuth();
    //const usersCollectionRef = collection(db, String(user.uid));

    // useEffect(() => {
    //     let usersCollectionRef;
    //     if (auth) {
    //         //CollectionReference<DocumentData>
    //         usersCollectionRef = collection(db, String(user.uid));
    //     }
    // }, [user]);

    useEffect(() => {
        const getTaskArrays = async () => {
            if (user != null) {
                const usersCollectionRef = collection(db, String(user.uid));
                const data = await getDocs(usersCollectionRef);
                let code: Task[] = [];
                let test: Task[] = [];
                let deploy: Task[] = [];
                let todone: Task[] = [];
                console.log(data.docs);
                data.docs.forEach((doc) => {
                    //}); data.docs doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data().stage);
                    //(doc) => {
                    const newTask: Task = {
                        id: Number(doc.data().id),
                        position: 0,
                        todo: String(doc.data().todo),
                        note: doc.data().note,
                        stage: Number(doc.data().stage),
                        delivery: new Date(
                            doc.data().year,
                            doc.data().month,
                            doc.data().date
                        ),
                    };
                    switch (newTask.stage) {
                        case 0:
                            code = [...code, newTask];
                            break;
                        case 1:
                            test = [...test, newTask];
                            break;
                        case 2:
                            deploy = [...deploy, newTask];
                            break;
                        case 3:
                            todone = [...todone, newTask];
                            break;
                        default:
                            console.log("Invalid Input");
                    }
                });
                setDone(todone);
                setToDeploy(deploy);
                setToTest(test);
                setToCode(code);
            }
        };
        if (user !== null) {
            getTaskArrays();
        } else {
            setDone([]);
            setToDeploy([]);
            setToTest([]);
            setToCode([]);
        }
    }, [user]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = Date.now();
        if (todo) {
            let oneWeekLater = new Date();
            oneWeekLater.setDate(oneWeekLater.getDate() + 7);
            setToCode([
                ...toCode,
                {
                    id: Number(id),
                    position: toCode.length,
                    todo: todo,
                    note: "",
                    stage: 0,
                    delivery: oneWeekLater,
                },
            ]);
            setTodo("");
            if (user) {
                const usersCollectionRef = collection(db, user.uid);
                console.log(usersCollectionRef);
                await setDoc(doc(db, user.uid, String(id)), {
                    id: String(id),
                    todo: String(todo),
                    note: String(""),
                    stage: 0,
                    date: oneWeekLater.getDate(),
                    month: oneWeekLater.getMonth(),
                    year: oneWeekLater.getFullYear(),
                });
            }
        }
    };

    const updateStage = async (id: number, stage: number) => {
        if (user) {
            //const usersCollectionRef = collection(db, user.uid);
            const userDoc = doc(db, user.uid + "/" + id);
            const newFields = { stage: stage };
            await updateDoc(userDoc, newFields);
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

        let add: Task;
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
            updateStage(add.id, 0);
        } else if (destination.droppableId === "ToTestList") {
            add.stage = 1;
            test.splice(destination.index, 0, add);
            updateStage(add.id, 1);
        } else if (destination.droppableId === "ToDeployList") {
            add.stage = 2;
            deploy.splice(destination.index, 0, add);
            updateStage(add.id, 2);
        } else {
            add.stage = 3;
            todone.splice(destination.index, 0, add);
            updateStage(add.id, 3);
        }

        setDone(todone);
        setToDeploy(deploy);
        setToTest(test);
        setToCode(code);
    };

    return (
        <div className="App">
            <NavBar />
            <InputTask todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <DragDropContext onDragEnd={onDragEnd}>
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
            </DragDropContext>
        </div>
    );
};

export default App;
