import React, { useRef } from "react";
import "./styles.css";

interface props {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputTask: React.FC<props> = ({ task, setTask, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            className="input"
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur();
            }}
        >
            <input
                type="text"
                placeholder="Enter a Task"
                value={task}
                ref={inputRef}
                onChange={(e) => setTask(e.target.value)}
                className="input__box"
            />
            <button type="submit" className="input_submit">
                GO
            </button>
        </form>
    );
};

export default InputTask;
