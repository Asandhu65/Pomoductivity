function Menu() {
  return (
    <div className="relative">
      <div className="absolute right-1">
        <div className="bg-grey bg-opacity-50 shadow-lg text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] rounded-md p-3">
          <form action="">
            <input type="checkbox" />
            <label htmlFor="">Popular</label>
            <p>25 min Pomodoro</p>
            <p>5 min Short Break</p>
            <p>15 min Long Break</p>
            <br />
            <input type="checkbox" />
            <label htmlFor="">Custom</label>
            <br />
            <label htmlFor="pomodoro">Pomodoro</label>
            <input type="number" name="pomodoro" />
            <br />
            <label htmlFor="short_break">Short Break</label>
            <input type="number" name="short_break" />
            <br />
            <label htmlFor="long_break">Long Break</label>
            <input type="number" name="long_break" />
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
