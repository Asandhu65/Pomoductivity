import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Menu({ onTimeSet }) {
  const [timerOptions, setTimerOptions] = useState(() => {
    const saved = localStorage.getItem("timerOptions");
    return saved
      ? JSON.parse(saved)
      : {
          selectedOption: "customTimer",
          customPomodoro: "",
          customShortBreak: "",
          customLongBreak: "",
        };
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("timerOptions", JSON.stringify(timerOptions));
  }, [timerOptions]);

  const handleSubmit = e => {
    e.preventDefault();

    if (timerOptions.selectedOption === "customTimer") {
      const { customPomodoro, customShortBreak, customLongBreak } =
        timerOptions;

      if (!customPomodoro || !customShortBreak || !customLongBreak) {
        setErrorMessage("Please fill out all custom timer fields.");
        return;
      }
      console.log("Pomodoro:", customPomodoro);
      console.log("Short Break:", customShortBreak);
      console.log("Long Break:", customLongBreak);

      const newDurations = {
        pomodoro: Math.floor(Number(customPomodoro)) * 60,
        shortBreak: Math.floor(Number(customShortBreak)) * 60,
        longBreak: Math.floor(Number(customLongBreak)) * 60,
      };
      console.log("Converted Durations:", newDurations);

      onTimeSet(newDurations, "customTimer");
      setErrorMessage("");
    }
  };

  const handleInputChange = (field, value) => {
    const numValue = value === "" ? "" : Math.max(0, Number(value));
    setTimerOptions(prev => ({
      ...prev,
      [field]: numValue,
    }));
  };

  return (
    <div className="relative">
      <div className="absolute right-1 mr-1 w-[200px]">
        <div className="bg-grey bg-opacity-50 shadow-lg text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded-md p-3">
          <form onSubmit={handleSubmit}>
            <label>Timer</label>
            <br />
            <label>Pomodoro</label>
            <input
              name="pomodoro"
              className="text-black rounded m-1 w-1/4"
              type="number"
              min="1"
              step="1"
              value={timerOptions.customPomodoro || ""}
              onChange={e =>
                handleInputChange("customPomodoro", e.target.value)
              }
            />
            <br />
            <label>Short Break</label>
            <input
              name="shortBreak"
              className="text-black rounded m-1 w-1/4"
              type="number"
              min="1"
              step="1"
              value={timerOptions.customShortBreak || ""}
              onChange={e =>
                handleInputChange("customShortBreak", e.target.value)
              }
            />
            <br />
            <label>Long Break</label>
            <input
              name="longBreak"
              className="text-black rounded m-1 w-1/4"
              type="number"
              min="1"
              step="1"
              value={timerOptions.customLongBreak || ""}
              onChange={e =>
                handleInputChange("customLongBreak", e.target.value)
              }
            />
            <br />

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  onTimeSet: PropTypes.func.isRequired,
};

export default Menu;
