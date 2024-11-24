import "./output.css";
import "./index.css";
import { Button } from "./components/ui/button.jsx";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

const timerProps = {
  isPlaying: true,
  size: 500,
  strokeWidth: 12,
};

const renderTimer = (dimension, time) => {
  return (
    <div className="timer">
      <div>{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

function App() {
  const formatTime = remainingTime => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <Button className="DEFAULT bg-opacity-40 shadow-lg p-2">
        <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          To-Do List
        </div>
      </Button>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          {...timerProps}
          colors="white"
          duration={1500}
          onComplete={{
            shouldRepeat: true,
          }}
        >
          {({ remainingTime, color }) => (
            <span style={{ color }}>
              {renderTimer(formatTime(remainingTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default App;
