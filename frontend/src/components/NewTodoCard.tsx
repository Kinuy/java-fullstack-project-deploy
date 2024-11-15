import * as React from "react";
import {useState} from "react";
import {Todo} from "../Todo.ts";
import axios from "axios";

type Props = {
    onTodoItemChange: () => void
}

export default function NewTodoCard(props: Props) {

    const [text, setText] = useState("");

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    function saveTodo() {
        setText("")
        axios.post("api/todo", {
            description: text,
            status: "OPEN",
        } as Todo)
            .then(props.onTodoItemChange)
    }


    return (
        <div className="todo-card new-todo">
            <input type="text" value={text} onInput={changeText}/>
            <button onClick={saveTodo}>save</button>
        </div>
    );
}

