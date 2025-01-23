import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Menu({ onTimeSet }) {
  const [timerOptions, setTimerOptions] = useState(() => {
    const saved = localStorage.getItem("timerOptions");
    return saved
      ? JSON.parse(saved)
      : {
          defaultTimer: false,
          customTimer: false,
          customPomodoro: "",
          customShortBreak: "",
          customLongBreak: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("timerOptions", JSON.stringify(timerOptions));
  }, [timerOptions]);

  const handleCheckboxChange = option => {
    if (option === "defaultTimer") {
      setTimerOptions({
        defaultTimer: !timerOptions.defaultTimer,
        customTimer: false,
        customPomodoro: "",
        customShortBreak: "",
        customLongBreak: "",
      });

      if (!timerOptions.defaultTimer) {
        onTimeSet({
          pomodoro: 25 * 60,
          shortBreak: 5 * 60,
          longBreak: 15 * 60,
        });
      }
    } else {
      const validPomodoro = parseInt(timerOptions.customPomodoro || 0) * 60;
      const validShortBreak = parseInt(timerOptions.customShortBreak || 0) * 60;
      const validLongBreak = parseInt(timerOptions.customLongBreak || 0) * 60;

      setTimerOptions({
        defaultTimer: false,
        customTimer: !timerOptions.customTimer,
        customPomodoro: timerOptions.customPomodoro,
        customShortBreak: timerOptions.customShortBreak,
        customLongBreak: timerOptions.customLongBreak,
      });

      if (!timerOptions.customTimer) {
        onTimeSet({
          pomodoro: validPomodoro || 1500,
          shortBreak: validShortBreak || 300,
          longBreak: validLongBreak || 900,
        });
      }
    }
  };

  const handleCustomTimeChange = (type, value) => {
    const minutes = Math.max(1, parseInt(value || "0"));
    setTimerOptions(prev => ({
      ...prev,
      [type]: value,
    }));

    if (timerOptions.customTimer) {
      onTimeSet({
        pomodoro:
          type === "customPomodoro"
            ? minutes * 60
            : parseInt(timerOptions.customPomodoro || "0") * 60,
        shortBreak:
          type === "customShortBreak"
            ? minutes * 60
            : parseInt(timerOptions.customShortBreak || "0") * 60,
        longBreak:
          type === "customLongBreak"
            ? minutes * 60
            : parseInt(timerOptions.customLongBreak || "0") * 60,
      });
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-1 mr-1 w-[200px]">
        <div className="bg-grey bg-opacity-50 shadow-lg text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded-md p-3">
          <form>
            <input
              type="checkbox"
              checked={timerOptions.defaultTimer}
              onChange={() => handleCheckboxChange("defaultTimer")}
            />
            <label>Popular</label>
            <p>25 min Pomodoro</p>
            <p>5 min Short Break</p>
            <p>15 min Long Break</p>
            <br />
            <input
              type="checkbox"
              checked={timerOptions.customTimer}
              onChange={() => handleCheckboxChange("customTimer")}
            />
            <label>Custom Timer</label>
            <br />
            <label>Pomodoro</label>
            {timerOptions.customTimer && (
              <input
                name="pomodoro"
                className="text-black rounded m-1 w-1/4"
                type="number"
                min="1"
                value={timerOptions.customPomodoro || ""}
                onChange={e =>
                  handleCustomTimeChange("customPomodoro", e.target.value)
                }
              />
            )}
            <br />
            <label>Short Break</label>
            {timerOptions.customTimer && (
              <input
                name="short break"
                className="text-black rounded m-1 w-1/4"
                type="number"
                min="1"
                value={timerOptions.customShortBreak}
                onChange={e =>
                  handleCustomTimeChange("customShortBreak", e.target.value)
                }
              />
            )}
            <br />
            <label>Long Break</label>
            {timerOptions.customTimer && (
              <input
                name="long break"
                className="text-black rounded m-1 w-1/4"
                type="number"
                min="1"
                value={timerOptions.customLongBreak}
                onChange={e =>
                  handleCustomTimeChange("customLongBreak", e.target.value)
                }
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Menu;
