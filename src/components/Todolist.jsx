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
    <div className="relative">
      <div className="bg-grey bg-opacity-20 shadow-lg text-black w-64 mb-3 rounded-md absolute left-1">
        {toDos.length === 0 && (
          <p className="flex justify-center">No tasks set.</p>
        )}
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button
          className="grey bg-opacity-60 shadow-lg p-0.5 border-2 border-grey rounded-md ml-1"
          onClick={addTask}
        >
          Add Task
        </button>
        <ul>
          {toDos.map((task, index) => {
            return (
              <li className="" key={index}>
                <input type="checkbox" />
                <span className="p-3">{task}</span>
                <button
                  className="grey bg-opacity-40 shadow-lg p-0.5 border-2 border-grey rounded-md"
                  onClick={() => deleteTask(task)}
                >
                  Delete
                </button>
                <button className="grey bg-opacity-40 shadow-lg p-0.5 border-2 border-grey rounded-md ml-1">
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todolist;
