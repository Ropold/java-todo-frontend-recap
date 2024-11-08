import { Todo } from "./Home";
import './TodoColumn.css'
import {Link} from "react-router-dom";


type TodoColumnProps = {
    title: string;
    todos: Todo[];
    onDelete: (id: string) => void;
    onUpdateStatus: (id: string, newStatus: "OPEN" | "IN_PROGRESS" | "DONE") => void;
};

function onMouseEnter(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.currentTarget.classList.add("hovered");
}

function onMouseLeave(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event.currentTarget.classList.remove("hovered");
}



export default function TodoColumn({ title, todos, onDelete, onUpdateStatus }: TodoColumnProps) {
    return (
        <div>
            <h2>{title}</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    >
                        <strong>{todo.description}</strong>
                        <Link to={`/todo/${todo.id}`}>
                            <button>Details</button>
                        </Link>
                        <button onClick={() => onDelete(todo.id)}>Delete</button>
                        <select
                            value={todo.status}
                            onChange={(e) => onUpdateStatus(todo.id, e.target.value as "OPEN" | "IN_PROGRESS" | "DONE")}
                        >
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
}