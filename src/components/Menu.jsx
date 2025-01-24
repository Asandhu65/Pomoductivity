/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function Menu({ onTimeSet, clearTimer }) {
  const [timerOptions, setTimerOptions] = useState(() => {
    const saved = localStorage.getItem("timerOptions");
    return saved
      ? JSON.parse(saved)
      : {
          selectedOption: "defaultTimer",
          customPomodoro: "",
          customShortBreak: "",
          customLongBreak: "",
        };
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("timerOptions", JSON.stringify(timerOptions));
  }, [timerOptions]);

  useEffect(() => {
    if (
      timerOptions.selectedOption === "customTimer" &&
      timerOptions.customPomodoro &&
      timerOptions.customShortBreak &&
      timerOptions.customLongBreak
    ) {
      const newDurations = {
        pomodoro: timerOptions.customPomodoro * 60,
        shortBreak: timerOptions.customShortBreak * 60,
        longBreak: timerOptions.customLongBreak * 60,
      };

      onTimeSet(newDurations, "customTimer");
    }
  }, [
    timerOptions.selectedOption,
    timerOptions.customPomodoro,
    timerOptions.customShortBreak,
    timerOptions.customLongBreak,
    onTimeSet,
  ]);

  const handleRadioChange = option => {
    setErrorMessage("");

    if (option === "defaultTimer") {
      const defaultDurations = {
        pomodoro: 25 * 60, // 25 minutes in seconds
        shortBreak: 5 * 60, // 5 minutes in seconds
        longBreak: 15 * 60, // 15 minutes in seconds
      };

      setTimerOptions({
        selectedOption: "defaultTimer",
        customPomodoro: "",
        customShortBreak: "",
        customLongBreak: "",
      });

      // Always pass the type to ensure the timer updates
      onTimeSet(defaultDurations, "defaultTimer");
    } else if (option === "customTimer") {
      clearTimer();

      setTimerOptions(prev => ({
        ...prev,
        selectedOption: "customTimer",
      }));

      onTimeSet(
        {
          pomodoro: 0,
          shortBreak: 0,
          longBreak: 0,
        },
        "customTimer"
      );
    }
  };

  const handleCustomTimeChange = (type, value) => {
    const updatedValue = value === "" ? "" : parseInt(value, 10);

    setTimerOptions(prev => ({
      ...prev,
      [type]: updatedValue,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (timerOptions.selectedOption === "customTimer") {
      const { customPomodoro, customShortBreak, customLongBreak } =
        timerOptions;

      if (!customPomodoro || !customShortBreak || !customLongBreak) {
        setErrorMessage("Please fill out all custom timer fields.");
        return;
      }

      const newDurations = {
        pomodoro: customPomodoro * 60,
        shortBreak: customShortBreak * 60,
        longBreak: customLongBreak * 60,
      };

      onTimeSet(newDurations, "customTimer");
      setErrorMessage("");
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-1 mr-1 w-[200px]">
        <div className="bg-grey bg-opacity-50 shadow-lg text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded-md p-3">
          <form onSubmit={handleSubmit}>
            <input
              type="radio"
              name="timerOption"
              checked={timerOptions.selectedOption === "defaultTimer"}
              onChange={() => handleRadioChange("defaultTimer")}
            />
            <label>Popular</label>
            <p>25 min Pomodoro</p>
            <p>5 min Short Break</p>
            <p>15 min Long Break</p>
            <br />

            <input
              type="radio"
              name="timerOption"
              checked={timerOptions.selectedOption === "customTimer"}
              onChange={() => handleRadioChange("customTimer")}
            />
            <label>Custom Timer</label>
            <br />
            <label>Pomodoro</label>
            {timerOptions.selectedOption === "customTimer" && (
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
            {timerOptions.selectedOption === "customTimer" && (
              <input
                name="shortBreak"
                className="text-black rounded m-1 w-1/4"
                type="number"
                min="1"
                value={timerOptions.customShortBreak || ""}
                onChange={e =>
                  handleCustomTimeChange("customShortBreak", e.target.value)
                }
              />
            )}
            <br />
            <label>Long Break</label>
            {timerOptions.selectedOption === "customTimer" && (
              <input
                name="longBreak"
                className="text-black rounded m-1 w-1/4"
                type="number"
                min="1"
                value={timerOptions.customLongBreak || ""}
                onChange={e =>
                  handleCustomTimeChange("customLongBreak", e.target.value)
                }
              />
            )}
            <br />

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            {timerOptions.selectedOption === "customTimer" && (
              <button
                type="submit"
                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
              >
                Apply
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Menu;
