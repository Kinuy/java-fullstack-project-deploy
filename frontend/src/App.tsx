
import {Todo} from "./Todo.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {allPossibleTodos} from "./TodoStatus.ts";
import TodoColumn from "./components/TodoColumn.tsx";



export default function App() {

    const [todos, setTodos] = useState<Todo[]>()

    function fetchTodos(){
        console.log("running")
        axios.get("/api/todo")
            .then(response => {
                setTodos(response.data)
            })

    }

    function login(){
        //const host: string = window.location.host === 'localhost5173' ? 'http://localhost8080' : window.location.origin;

        window.open("http://localhost:8080/oauth2/authorization/github","_self")
        //window.open(host + "/oauth2/authorization/github","_self")
    }

    function loadCurrentUsre(){
        axios.get("api/users/me").then((response) => {console.log(response.data)})
    }

    useEffect(() => fetchTodos(), []);

    if (!todos) {
        return "Lade..."
    }

    return (
        <>
            <button onClick={login}>Login</button>
            <button onClick={loadCurrentUsre}>Me</button>
            <div className="page">
                <h1>TODOs</h1>

                {
                    allPossibleTodos.map(status => {
                        const filteredTodos = todos.filter(todo => todo.status === status)
                        return <TodoColumn status={status}
                                           todos={filteredTodos}
                                           onTodoItemChange={fetchTodos}
                                           key={status}
                        />
                    })
                }
            </div>

        </>
    );
}

