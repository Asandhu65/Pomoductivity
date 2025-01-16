import { useEffect, useState } from "react";

function Todolist() {
  const [toDos, setToDos] = useState(() => {
    const savedToDos = localStorage.getItem("todos");
    return savedToDos ? JSON.parse(savedToDos) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);

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
    <div className="bg-grey bg-opacity-20 shadow-lg text-white w-64 mb-3 rounded-md absolute left-3 top-14">
      {toDos.length === 0 && (
        <p className="flex justify-center text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          No tasks set.
        </p>
      )}
      <input
        className="text-black rounded"
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
  );
}

export default Todolist;
