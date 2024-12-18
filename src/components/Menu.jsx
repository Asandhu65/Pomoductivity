import { useEffect, useState } from "react";

function Menu({ onTimeSet }) {
  const [timerOptions, setTimerOptions] = useState(() => {
    const saved = localStorage.getItem("timerOptions");
    return saved
      ? JSON.parse(saved)
      : {
          defaultTimer: false,
          customTimer: false,
          customMinutes: "",
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
        customMinutes: timerOptions.customMinutes,
      });

      if (!timerOptions.defaultTimer) {
        onTimeSet(25 * 60);
      }
    } else {
      setTimerOptions({
        defaultTimer: false,
        customTimer: !timerOptions.customTimer,
        customMinutes: timerOptions.customMinutes,
      });
    }
  };

  const handleCustomTimeChange = value => {
    const minutes = Math.max(0, parseInt(value) || 0);
    setTimerOptions(prev => ({
      ...prev,
      customMinutes: value,
    }));

    if (timerOptions.customTimer && value) {
      onTimeSet(minutes * 60);
    }
  };

  return (
    <div className="relative">
      <div className="absolute right-1">
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
            <label htmlFor="">Custom Timer</label>
            <br />
            <label htmlFor="pomodoro">Pomodoro</label>

            {timerOptions.customTimer && (
              <input
                name="pomodoro"
                className="text-black"
                type="number"
                min="1"
                value={timerOptions.customMinutes}
                onChange={e => handleCustomTimeChange(e.target.value)}
              />
            )}
            {/* <br />
            <label htmlFor="short_break">Short Break</label>
            <input className="text-black" type="number" name="short_break" />
            <br />
            <label htmlFor="long_break">Long Break</label>
            <input className="text-black" type="number" name="long_break" /> */}
          </form>
          {/* <button className="ml-24 mt-5 bg-grey bg-opacity-70 shadow-lg p-2 rounded-md [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
            Set Timer
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
