import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";
import { useEffect, useState } from "react";
import Timer from "./components/Timer.jsx";
import Menu from "./components/Menu.jsx";
import Todolist from "./components/Todolist.jsx";

function App() {
  const [showList, setShowList] = useState(false);

  const [showMenu, setShowMenu] = useState(() => {
    const savedState = localStorage.getItem("componentVisibility");
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("componentVisibility", JSON.stringify(showMenu));
  }, [showMenu]);

  const toggleVisibilty = () => {
    setShowMenu(prevState => !prevState);
  };

  return (
    <div>
      <div className="flex justify-between p-4">
        <Button
          onClick={toggleVisibilty}
          className="grey bg-opacity-20 shadow-lg p-2"
        >
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
      <div className={showMenu ? "" : "hidden"}>
        <Menu />
      </div>
      <div className={showList ? "" : "hidden"}>
        <Todolist />
      </div>
      <div>
        <Timer />
      </div>
    </div>
  );
}

export default App;
