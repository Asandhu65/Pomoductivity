import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// eslint-disable-next-line react/prop-types
function Timer({ duration, isPlaying, timerKey }) {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [pomoCompletionCount, setPomoCompletionCount] = useState(() => {
    const savedCount = localStorage.getItem("pomoCompletionCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const playSound = () => {
    const audio = new Audio(
      "src/assets/alarm-clock-ringing-fascinatedsound-1-00-03.mp3"
    );
    audio.play();
  };

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="flex flex-col items-center">
        <div className="text-6xl text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="text-md text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
          {remainingTime === 0 ? "Time for a break!" : "Focus"}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const updateTitle = () => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      document.title = remainingTime
        ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds} - Focus`
        : "Break Time! - Pomoductivity";
    };

    updateTitle();
  }, [remainingTime]);

  useEffect(() => {
    setRemainingTime(duration);
  }, [duration]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(prevTime => {
        if (isPlaying && prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, duration]);

  useEffect(() => {
    return () => {
      document.title = "Pomoductivity";
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("pomoCompletionCount", pomoCompletionCount);
  }, [pomoCompletionCount]);

  useEffect(() => {
    localStorage.setItem("selectedDuration", duration);
  }, [duration]);

  return (
    <>
      <div className="flex justify-center">
        <p className="text-xl text-white font-medium [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] bg-grey bg-opacity-30  rounded-tl-md rounded-bl-md w-56 m-0 p-2 flex justify-center">
          {pomoCompletionCount} Pomodoro&apos;s
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
          onUpdate={time => setRemainingTime(time)}
          onComplete={() => {
            playSound();
            setPomoCompletionCount(prev => prev + 1);
            return { shouldRepeat: false };
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default Timer;
