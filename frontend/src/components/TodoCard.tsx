import {Todo} from "../Todo.ts";
import axios from "axios";
import {useState} from "react";
import * as React from "react";
import {TodoStatus} from "../TodoStatus.ts";

type Props = {
    todo: Todo,
    onTodoItemChange: () => void
}

export default function TodoCard(props: Props) {

    const [description, setDescription] = useState(props.todo.description)

    function deleteThisItem() {
        axios.delete("api/todo/" + props.todo.id)
            .then(props.onTodoItemChange)
    }

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        let newDescription = event.target.value
        setDescription(newDescription)
        axios.put("api/todo/" + props.todo.id, {
            id: props.todo.id,
            description: newDescription,
            status: props.todo.status,
        } as Todo)
    }

    function move(targetStatus: TodoStatus) {
        axios.put("api/todo/" + props.todo.id, {
            ...props.todo,
            status: targetStatus,
        } as Todo)
            .then(props.onTodoItemChange)
    }

    /*    function moveToRight() {
            //let newStatus = event.target.value
            axios.put("api/todo/" + props.todo.id, {
                ...props.todo,
                status: "IN_PROGRESS",
            } as Todo).then(props.onTodoItemChange)
        }

        function moveToLeft() {
            //let newStatus = event.target.value
            axios.put("api/todo/" + props.todo.id, {
                ...props.todo,
                status: "OPEN",
            } as Todo).then(props.onTodoItemChange)
        }*/

    return (
        <div className="todo-card">

            <input value={description} onInput={changeText}/>
            {
                props.todo.status === "OPEN"
                    ? <div></div>
                    : (
                        props.todo.status === "IN_PROGRESS"
                            ? <button onClick={() => move("OPEN")}>move left</button>
                            : <button onClick={() => move("IN_PROGRESS")}>move left</button>
                    )
            }
            <button onClick={deleteThisItem}>delete</button>
            {
                props.todo.status === "DONE"
                    ? <div></div>
                    : (
                        props.todo.status === "OPEN"
                            ? <button onClick={() => move("IN_PROGRESS")}>move right</button>
                            : <button onClick={() => move("DONE")}>move right</button>
                    )

            }
        </div>
    );
}

