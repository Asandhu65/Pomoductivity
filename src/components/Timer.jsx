import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "./ui/button.jsx";

const timerProps = {
  isPlaying: true,
  size: 600,
  strokeWidth: 18,
  trailColor: "#66666757",
};

const renderTimer = (dimension, time) => {
  return (
    <div className="timer">
      <div className="text-3xl font-medium relative -top-20">Session Name</div>
      <div>{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

function Timer() {
  const formatTime = remainingTime => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <div className="flex justify-center">
        <p className="text-xl text-white font-medium [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] bg-grey bg-opacity-30  rounded-tl-md rounded-bl-md w-56 m-0 p-2 flex justify-center">
          0 Pomodoro&apos;s
        </p>
        <p className="text-xl text-white font-medium [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] bg-grey bg-opacity-30  w-56 m-0 p-2 flex justify-center ">
          0 Breaks
        </p>
        <p className="text-xl text-white font-medium [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] bg-grey bg-opacity-30  rounded-tr-md rounded-br-md w-56 m-0 p-2 flex justify-center">
          0 Long Breaks
        </p>
      </div>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          {...timerProps}
          colors="#E1E1E1"
          duration={300}
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
        <div className="btns">
          <Button className="bg-grey bg-opacity-30 shadow-lg p-3 m-3">
            <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
              Start
            </div>
          </Button>
          <Button className="bg-grey bg-opacity-30 shadow-lg p-3 m-3">
            <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
              Stop
            </div>
          </Button>
          <Button className="bg-grey bg-opacity-30 shadow-lg p-3 m-3">
            <div className="[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
              Reset
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Timer;
