import { useEffect, useState } from "react";

function Menu() {
  const [firstBox, setFirstBox] = useState(() => {
    const saved = localStorage.getItem("menuData1");
    return saved ? JSON.parse(saved) : false;
  });

  const [secondBox, setSecondBox] = useState(() => {
    const saved = localStorage.getItem("menuData2");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("menuData1", JSON.stringify(firstBox));
  }, [firstBox]);

  useEffect(() => {
    localStorage.setItem("menuData2", JSON.stringify(secondBox));
  }, [secondBox]);

  return (
    <div className="relative">
      <div className="absolute right-1">
        <div className="bg-grey bg-opacity-50 shadow-lg text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded-md p-3">
          <form action="">
            <input
              type="checkbox"
              checked={firstBox}
              onChange={e => setFirstBox(e.target.checked)}
            />
            <label htmlFor="">Popular</label>
            <p>25 min Pomodoro</p>
            <p>5 min Short Break</p>
            <p>15 min Long Break</p>
            <br />
            <input
              type="checkbox"
              checked={secondBox}
              onChange={e => setSecondBox(e.target.checked)}
            />
            <label htmlFor="">Custom</label>
            <br />
            <label htmlFor="pomodoro">Pomodoro</label>
            <input className="text-black" type="number" name="pomodoro" />
            <br />
            <label htmlFor="short_break">Short Break</label>
            <input className="text-black" type="number" name="short_break" />
            <br />
            <label htmlFor="long_break">Long Break</label>
            <input className="text-black" type="number" name="long_break" />
          </form>
          <button className="ml-24 mt-5 bg-grey bg-opacity-70 shadow-lg p-2 rounded-md [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
            Set Timer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
