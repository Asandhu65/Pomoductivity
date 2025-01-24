import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";
import { useEffect, useState, useCallback } from "react";
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

  const [customDurations, setCustomDurations] = useState(() => {
    const savedDurations = localStorage.getItem("customDurations");
    return savedDurations
      ? JSON.parse(savedDurations)
      : {
          pomodoro: 1500,
          shortBreak: 300,
          longBreak: 900,
        };
  });

  const [timerType, setTimerType] = useState("defaultTimer");

  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  // Set the custom durations in the state when selected
  const handleTimeSet = useCallback((newDurations, type) => {
    const { pomodoro, shortBreak, longBreak } = newDurations;
    setCustomDurations({
      pomodoro: pomodoro || 1500,
      shortBreak: shortBreak || 300,
      longBreak: longBreak || 900,
    });

    setTimerType(type || "defaultTimer");
    setIsPlaying(false);
    setTimerKey(prev => prev + 1); // Force a re-render of the Timer component
  }, []);

  // Control the timer state
  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setIsPlaying(false);
    setTimerKey(prev => prev + 1);
    setCustomDurations(prev => ({ ...prev })); // Keep current custom timer settings on reset
  };

  // Clear Timer when switching to custom timer
  const clearTimer = () => {
    setIsPlaying(false);
    setCustomDurations({ pomodoro: 0, shortBreak: 0, longBreak: 0 });
    setTimerKey(prevKey => prevKey + 1); // Force a reset of the timer component
  };

  useEffect(() => {
    localStorage.setItem("componentVisibilityMenu", JSON.stringify(showMenu));
  }, [showMenu]);

  useEffect(() => {
    localStorage.setItem("componentVisibilityList", JSON.stringify(showList));
  }, [showList]);

  useEffect(() => {
    localStorage.setItem("customDurations", JSON.stringify(customDurations));
  }, [customDurations]);

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

      {showMenu && <Menu onTimeSet={handleTimeSet} clearTimer={clearTimer} />}
      <Timer
        customDurations={customDurations}
        isPlaying={isPlaying}
        timerKey={timerKey}
        isCustomSelected={timerType === "customTimer"}
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
      {showList && <Todolist />}
    </>
  );
}

export default App;
