import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";
import { useEffect, useState, useCallback } from "react";
import Timer from "./components/Timer.jsx";
import Menu from "./components/Menu.jsx";
import Todolist from "./components/Todolist.jsx";
import clock from "/src/assets/clock.svg";
import list from "/src/assets/list.svg";

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

  const handleTimeSet = useCallback((newDurations, type) => {
    const updatedDurations = {
      pomodoro: newDurations.pomodoro || 1500,
      shortBreak: newDurations.shortBreak || 300,
      longBreak: newDurations.longBreak || 900,
    };

    setCustomDurations(updatedDurations);

    setTimerType(type || "customTimer");
    setIsPlaying(false);
    setTimerKey(prev => prev + 1);
  }, []);

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setIsPlaying(false);
    setTimerKey(prev => prev + 1);
    setCustomDurations(prev => ({ ...prev }));
  };

  const clearTimer = () => {
    setIsPlaying(false);
    setCustomDurations({ pomodoro: 0, shortBreak: 0, longBreak: 0 });
    setTimerKey(prevKey => prevKey + 1);
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
          className="grey bg-opacity-20 p-2 shadow-lg hover:shadow-[0_0_15px_#141414] transition duration-500"
        >
          <div className="flex items-center gap-1 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] ">
            <img src={list} className="w-5 h-5" />
            To-Do List
          </div>
        </Button>

        <Button
          onClick={() => setShowMenu(!showMenu)}
          className="grey bg-opacity-20 shadow-lg p-2 justify-end hover:shadow-[0_0_15px_#D3D3D3] transition duration-500"
        >
          <div className="flex items-center gap-2 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
            <img src={clock} className="w-5 h-5" />
            Set Timer
          </div>
        </Button>
      </div>

      {showMenu && (
        <Menu
          onTimeSet={newDurations => handleTimeSet(newDurations, "customTimer")}
          clearTimer={clearTimer}
        />
      )}

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
