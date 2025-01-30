import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button.jsx";

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
        <div className="bg-grey bg-opacity-20 shadow-lg text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded-md p-3">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center space-y-2">
              <label className="text-lg font-semibold">Timer</label>

              <div className="flex items-center space-x-2">
                <label className="w-24 text-right [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
                  Pomodoro
                </label>
                <input
                  name="pomodoro"
                  className="text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded w-12 p-1 bg-grey bg-opacity-60 focus:ring-gray-600"
                  min="1"
                  step="1"
                  value={timerOptions.customPomodoro || ""}
                  onChange={e =>
                    handleInputChange("customPomodoro", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="w-24 text-right [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
                  Short Break
                </label>
                <input
                  name="shortBreak"
                  className="text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded w-12 p-1 bg-grey bg-opacity-60 focus:ring-gray-600"
                  type="number"
                  min="1"
                  step="1"
                  value={timerOptions.customShortBreak || ""}
                  onChange={e =>
                    handleInputChange("customShortBreak", e.target.value)
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="w-24 text-right [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
                  Long Break
                </label>
                <input
                  name="longBreak"
                  className="text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded w-12 p-1 bg-grey bg-opacity-60 focus:ring-gray-600"
                  type="number"
                  min="1"
                  step="1"
                  value={timerOptions.customLongBreak || ""}
                  onChange={e =>
                    handleInputChange("customLongBreak", e.target.value)
                  }
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>

            <div className="flex justify-center items-center my-5">
              <Button
                type="submit"
                className="grey bg-opacity-80 p-2 shadow-[0_0_10px_#D3D3D3] hover:shadow-[0_0_25px_#D3D3D3] transition duration-300"
              >
                Apply
              </Button>
            </div>
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
