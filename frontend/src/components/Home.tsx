import {useEffect, useState} from "react";
import axios from "axios";

import AddTodo from "./AddTodo.tsx";
import TodoColumn from "./TodoColumn.tsx";

export type Todo = {
    id: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "DONE";
};

export default function Home(){

    const [todos, setTodos] = useState<Todo[]>([]);
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<"OPEN" | "IN_PROGRESS" | "DONE">("OPEN");


    useEffect(() => {
        console.log("loaded all todos")
        loadAllTodos()
    }, [])

    const loadAllTodos = () => {
        axios.get("/api/todo")
            .then((response) =>{
                setTodos(response.data)
            })
            .catch((error) => {
                console.error("Error loading todos", error)
            })
    }

   const createNewTodo = () => {
       const newTodo = { description, status };
       axios
           .post("/api/todo", newTodo)
           .then((response) => {
               setTodos((prevTodos) => [...prevTodos, response.data]);
               setDescription(""); // Reset the input field
           })
           .catch((error) => {
               console.error("Error creating todo", error);
           });
   }

    const deleteTodo = (id: string) => {
        axios
            .delete(`/api/todo/${id}`)
            .then(() => {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting todo", error);
            });
    }

    const updateStatus = (id: string, newStatus: "OPEN" | "IN_PROGRESS" | "DONE") => {
        const updatedTodo = todos.find((todo) => todo.id === id);
        if (!updatedTodo) return;

        const todoToUpdate = {
            ...updatedTodo,
            status: newStatus
        };

        axios
            .put(`/api/todo/${id}/update`, todoToUpdate)  // Make sure to match the correct URL
            .then((response) => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id ? response.data : todo
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating todo", error);
            });
    };


    return(
        <>
            <h1>Home</h1>

            <div className={"columns-container"}>
                <div className={"single-column"}>
                    <TodoColumn
                    title="Open"
                    todos={todos.filter((todo) => todo.status === "OPEN")}
                    onDelete={deleteTodo}
                    onUpdateStatus={updateStatus}
                /></div>
                <div className={"single-column"}>
                    <TodoColumn
                    title="In Progress"
                    todos={todos.filter((todo) => todo.status === "IN_PROGRESS")}
                    onDelete={deleteTodo}
                    onUpdateStatus={updateStatus}
                /></div>
                <div className={"single-column"}>
                    <TodoColumn
                    title="Done"
                    todos={todos.filter((todo) => todo.status === "DONE")}
                    onDelete={deleteTodo}
                    onUpdateStatus={updateStatus}
                /></div>
            </div>


            <div className={"add-todo"}>
            <AddTodo
                description={description}
                status={status}
                setDescription={setDescription}
                setStatus={setStatus}
                createNewTodo={createNewTodo}
            />
            </div>
        </>
    );
}

