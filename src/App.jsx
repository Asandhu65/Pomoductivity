import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";
import Timer from "./components/Timer.jsx";
import Menu from "./components/Menu.jsx";

function App() {
  return (
    <div>
      <div className="flex justify-between p-4">
        <Button className="grey bg-opacity-20 shadow-lg p-2">
          <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
            To-Do List
          </div>
        </Button>
        <Button className="grey bg-opacity-20 shadow-lg p-2 justify-end">
          <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
            Set Custom Timer
          </div>
        </Button>
      </div>
      <Menu />
      <Timer />
    </div>
  );
}

export default App;
