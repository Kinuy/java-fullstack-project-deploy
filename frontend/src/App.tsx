import {Todo} from "./Todo.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router";
import {HomePage} from "./components/HomePage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NewTodoCard from "./components/NewTodoCard.tsx";
import {Link} from "react-router-dom";


export default function App() {

    const [todos, setTodos] = useState<Todo[]>()
    const [user, setUser] = useState<string>()

    function fetchTodos() {
        console.log("running")
        axios.get("/api/todo")
            .then(response => {
                setTodos(response.data)
            })

    }

    function login() {
        const host: string = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + "/oauth2/authorization/github", "_self")
    }

    function logout() {
        const host: string = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;
        window.open(host + "/logout", "_self")
    }

    function loadCurrentUser() {
        axios.get("/api/users/me")
            .then((response) => {
            console.log(response.data)
            setUser(response.data)
        })
    }

    useEffect(() => fetchTodos(), []);
    useEffect(() => loadCurrentUser(), []);

    if (!todos) {
        return "Lade..."
    }

    return (
        <>
            {!user && <button onClick={login}>Login</button>}
            <p>{user}</p>
            {user && <button onClick={logout}>Logout</button>}
            <Link to={"/"}>Home</Link>
            <Link to={"/new"}>New</Link>
            <Link to={"/admin"}>New</Link>

            <div className="page">
                <h1>My TODO App</h1>
                <Routes>
                    <Route path={"/"} element={<HomePage todos={todos} fetchTodos={fetchTodos}/>}/>


                    <Route element={<ProtectedRoute user={user}/>}>
                        <Route path={"/new"} element={<NewTodoCard onTodoItemChange={fetchTodos}/>}/>

                        <Route path={"/admin"} element={<NewTodoCard onTodoItemChange={fetchTodos}/>}/>
                    </Route>


                </Routes>
            </div>
        </>
    )
        ;
}


