import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";
import Timer from "./components/Timer.jsx";

function App() {
  return (
    <div>
      <Button className="DEFAULT bg-opacity-40 shadow-lg p-2">
        <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          To-Do List
        </div>
      </Button>
      <Timer />
    </div>
  );
}

export default App;
