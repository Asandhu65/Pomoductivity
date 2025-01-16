import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";
import { useEffect, useState } from "react";
import Timer from "./components/Timer.jsx";
import Menu from "./components/Menu.jsx";
import Todolist from "./components/Todolist.jsx";

function App() {
  const [showList, setShowList] = useState(() => {
    const savedStateList = localStorage.getItem("componentVisibilityList");
    return savedStateList ? JSON.parse(savedStateList) : false;
  });

  const [showMenu, setShowMenu] = useState(() => {
    const savedState = localStorage.getItem("componentVisibilityMenu");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [duration, setDuration] = useState(0);
  const [inititalDuration, setInititalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const handleTimeSet = seconds => {
    setDuration(seconds);
    setInititalDuration(seconds);
    setIsPlaying(false);
    setTimerKey(prev => prev + 1);
    console.log("Timer set to:", seconds); // Debug log
  };

  const handleStart = () => setIsPlaying(true);

  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setIsPlaying(false);
    setDuration(inititalDuration);
    setTimerKey(prev => prev + 1);
    console.log("Timer reset to:", inititalDuration); // Debug log
  };

  useEffect(() => {
    localStorage.setItem("componentVisibilityMenu", JSON.stringify(showMenu));
  }, [showMenu]);

  useEffect(() => {
    localStorage.setItem("componentVisibilityList", JSON.stringify(showList));
  }, [showList]);

  return (
    <>
      <div className="flex justify-between p-4">
        <Button
          onClick={() => setShowList(!showList)}
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
        <Menu onTimeSet={handleTimeSet} />
      </div>
      {/* {duration > 0 && ( */}
      <>
        <Timer
          duration={duration}
          isPlaying={isPlaying}
          timerKey={timerKey}
          onComplete={() => setIsPlaying(false)}
        />

        <div className="btns">
          <Button
            className="bg-grey bg-opacity-30 shadow-lg p-3 m-3 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]"
            onClick={handleStart}
            disabled={isPlaying}
          >
            Start
          </Button>
          <Button
            className="bg-grey bg-opacity-30 shadow-lg p-3 m-3 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]"
            onClick={handlePause}
            disabled={!isPlaying}
          >
            Pause
          </Button>
          <Button
            className="bg-grey bg-opacity-30 shadow-lg p-3 m-3 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </>
      {/* )} */}
      <div className={showList ? "" : "hidden"}>
        <Todolist />
      </div>
    </>
  );
}

export default App;
