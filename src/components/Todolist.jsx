import { useEffect, useState } from "react";

function Todolist() {
  const [toDos, setToDos] = useState(() => {
    const savedToDos = localStorage.getItem("todos");
    return savedToDos ? JSON.parse(savedToDos) : [];
  });
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);

  const addTask = () => {
    if (input.trim() !== "") {
      setToDos([...toDos, { text: input.trim(), completed: false }]);
      setInput("");
    } else {
      alert("Task cannot be empty");
    }
  };

  const deleteTask = indexToDelete => {
    setToDos(toDos.filter((_, index) => index !== indexToDelete));
  };

  const toggleCompletion = index => {
    setToDos(prevToDos =>
      prevToDos.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task, index) => {
    setIsEditing(index);
    setEditInput(task.text);
  };

  const saveEdit = index => {
    if (editInput.trim() !== "") {
      setToDos(prevToDos =>
        prevToDos.map((task, i) =>
          i === index ? { ...task, text: editInput.trim() } : task
        )
      );
      setIsEditing(null);
      setEditInput("");
    } else {
      alert("Task cannot be empty");
    }
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditInput("");
  };

  return (
    <div className="bg-grey bg-opacity-20 shadow-lg text-white w-64 mb-3 rounded-md absolute left-3 top-14 p-3">
      {toDos.length === 0 && (
        <p className="flex justify-center text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          No tasks set.
        </p>
      )}
      <div className="flex gap-2 mb-2">
        <input
          className="text-black rounded flex-grow p-1"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button
          className="bg-grey bg-opacity-60 shadow-lg p-1 border-2 border-grey rounded-md"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {toDos.map((task, index) => (
          <li key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(index)}
            />
            {isEditing === index ? (
              <div className="flex gap-2 items-center flex-grow">
                <input
                  className="text-black rounded flex-grow p-1"
                  type="text"
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                />
                <button
                  className="bg-green-500 text-white p-1 rounded-md"
                  onClick={() => saveEdit(index)}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded-md"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-grow ${
                    task.completed ? "line-through text-gray-700" : ""
                  }`}
                >
                  {task.text}
                </span>
                <button
                  className="bg-blue-500 text-white p-1 rounded-md"
                  onClick={() => startEditing(task, index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded-md"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
