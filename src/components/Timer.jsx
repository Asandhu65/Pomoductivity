import { CountdownCircleTimer } from "react-countdown-circle-timer";

// eslint-disable-next-line react/prop-types
function Timer({ duration, isPlaying, timerKey }) {
  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="flex flex-col items-center">
        <div className="text-6xl text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="text-md text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          {remainingTime === 0 ? "Times up!" : ""}
        </div>
      </div>
    );
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
      <div className="flex flex-col items-center justify-center gap-2 pt-5">
        <CountdownCircleTimer
          key={timerKey}
          isPlaying={isPlaying}
          duration={duration}
          colors={"#66666757"}
          size={600}
          strokeWidth={18}
          isSmoothColorTransition
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default Timer;
