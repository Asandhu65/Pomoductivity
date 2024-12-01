import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";
import { useState } from "react";
import Timer from "./components/Timer.jsx";
import Menu from "./components/Menu.jsx";
import Todolist from "./components/Todolist.jsx";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <div className="flex justify-between p-4">
        <Button className="grey bg-opacity-20 shadow-lg p-2">
          <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
            To-Do List
          </div>
        </Button>
        <Button
          onClick={() => setShowMenu(!showMenu)}
          className="grey bg-opacity-20 shadow-lg p-2 justify-end"
        >
          <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
            Set Custom Timer
          </div>
        </Button>
      </div>
      {showMenu && <Menu />}
      <Todolist />
      <Timer />
    </div>
  );
}

export default App;
