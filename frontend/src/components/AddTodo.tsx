import './AddTodo.css'

type AddTodoProps = {
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "DONE";
    setDescription: (value: string) => void;
    setStatus: (value: "OPEN" | "IN_PROGRESS" | "DONE") => void;
    createNewTodo: () => void;
};

export default function AddTodo({
      description,
      status,
      setDescription,
      setStatus,
      createNewTodo,
      }: AddTodoProps) {

    return (
        <div>
            <h2>Add New Todo</h2>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value as "OPEN" | "IN_PROGRESS" | "DONE")}>
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
            </select>
            <button onClick={createNewTodo}>Create Todo</button>
        </div>
    );
}
