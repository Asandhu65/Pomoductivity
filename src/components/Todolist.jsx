import { useState } from "react";

function Todolist() {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setToDos([...toDos, input.trim()]);
      setInput("");
    } else {
      alert("Task cannot be empty");
    }
  };
  const deleteTask = taskToDelete => {
    setToDos(toDos.filter(task => task !== taskToDelete));
  };
  return (
    <div className="bg-grey bg-opacity-50 shadow-lg text-black w-64 mb-3 rounded-md">
      {toDos.length === 0 && <p>No task set yet!</p>}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button
        className="grey bg-opacity-40 shadow-lg p-0.5 border-2 border-black rounded-md"
        onClick={addTask}
      >
        Add Task
      </button>
      <ul>
        {toDos.map((task, index) => {
          return (
            <li className="" key={index}>
              <span className="p-3">{task}</span>
              <button
                className="grey bg-opacity-40 shadow-lg p-0.5 border-2 border-black rounded-md"
                onClick={() => deleteTask(task)}
              >
                Delete Task
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todolist;
