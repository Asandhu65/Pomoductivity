import { useEffect, useState } from "react";
import edit from "/src/assets/edit.svg";
import deleteicon from "/src/assets/deleteicon.svg";
import cancelicon from "/src/assets/cancelicon.svg";
import saveicon from "/src/assets/saveicon.svg";
import { Button } from "/src/components/ui/button.jsx";
import "/src/index.css";
import "/src/output.css";

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
    <div className="bg-grey bg-opacity-20 shadow-lg text-white w-100 mb-3 rounded-md absolute left-3 top-14 p-3">
      {toDos.length === 0 && (
        <p className="flex justify-center text-white  pb-3">No Tasks Set</p>
      )}
      <div className="flex gap-2 mb-2">
        <input
          className=" flex-grow text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded p-1 bg-grey bg-opacity-60 placeholder-white"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <Button
          className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] bg-grey bg-opacity-60 shadow-lg border-grey rounded-md p-2"
          onClick={addTask}
        >
          Add Task
        </Button>
      </div>
      <ul className="space-y-2">
        {toDos.map((task, index) => (
          <li key={index} className="flex items-center gap-2">
            <label className="flex items-center gap-2 ">
              <input
                className="hidden"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(index)}
              />

              <div
                className={`w-5 h-5 border-2 border-white rounded-sm bg-transparent flex items-center justify-center shadow-md${
                  task.completed ? "" : ""
                }`}
              >
                {task.completed && (
                  <svg
                    className="w-5 h-5 text-white filter drop-shadow-[2.5px_2px_3px_rgb(0_0_0/_100%)]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </label>

            {isEditing === index ? (
              <div className="flex gap-2 items-center flex-grow">
                <input
                  className="text-black rounded flex-grow p-1"
                  type="text"
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                />
                <Button
                  className="flex items-center gap-1 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] bg-green-600 text-white p-2 rounded-md grey bg-opacity-50 shadow-lg"
                  onClick={() => saveEdit(index)}
                >
                  <img src={saveicon} className="w-5 h-5" />
                  Save
                </Button>
                <Button
                  className="flex items-center gap-1 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] bg-red-600 text-white p-2 rounded-md grey bg-opacity-50 shadow-lg"
                  onClick={cancelEdit}
                >
                  <img src={cancelicon} className="w-5 h-5" />
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-grow [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] ${
                    task.completed ? "line-through text-gray-900" : ""
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  className="flex items-center gap-1 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] text-white p-3 rounded-md grey bg-opacity-50 shadow-lg bg-blue-600"
                  onClick={() => startEditing(task, index)}
                >
                  <img src={edit} className="w-5 h-5" />
                  Edit
                </Button>
                <Button
                  className="flex items-center gap-1 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] bg-red-600 text-white p-3 rounded-md bg-opacity-50 shadow-lg"
                  onClick={() => deleteTask(index)}
                >
                  <img src={deleteicon} className="w-5 h-5" />
                  Delete
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
