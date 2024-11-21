import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
// const hourSeconds = 3600;
// const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 500,
  strokeWidth: 12,
};

const renderTimer = (dimension, time) => {
  return (
    <div>
      <div>{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = time => (minuteSeconds - time) | 0;
// const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0;
// const getTimeHours = time => ((time % daySeconds) / hourSeconds) | 0;
// const getTimeDays = time => (time / daySeconds) | 0;

function App() {
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = startTime + 243248; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  // const days = Math.ceil(remainingTime / daySeconds);
  // const daysDuration = days * daySeconds;

  return (
    <div>
      <Button className="DEFAULT bg-opacity-40 shadow-lg p-2">
        <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          To-Do List
        </div>
      </Button>
      <CountdownCircleTimer
        {...timerProps}
        colors="white"
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={totalElapsedTime => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTimer("seconds", getTimeSeconds(elapsedTime))}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
}

export default App;
