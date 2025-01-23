/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Timer({
  isPlaying,
  timerKey,
  customDurations = { pomodoro: 1500, shortBreak: 300, longBreak: 900 },
}) {
  const [phase, setPhase] = useState("pomodoro");
  const [duration, setDuration] = useState(customDurations.pomodoro);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [pomoCount, setPomoCount] = useState(() => {
    const savedCount = localStorage.getItem("pomoCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [shortBreakCount, setShortBreakCount] = useState(() => {
    const savedCount = localStorage.getItem("shortBreakCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [longBreakCount, setLongBreakCount] = useState(() => {
    const savedCount = localStorage.getItem("longBreakCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const durations = useMemo(
    () => ({
      pomodoro: customDurations.pomodoro || 1500,
      shortBreak: customDurations.shortBreak || 300,
      longBreak: customDurations.longBreak || 900,
    }),
    [customDurations]
  );

  const remainingTimeRef = useRef(remainingTime);

  useEffect(() => {
    const updatedDuration = durations[phase];
    if (updatedDuration) {
      setDuration(updatedDuration);
      setRemainingTime(updatedDuration);
    }
  }, [phase, durations]);

  const playSound = () => {
    const audio = new Audio(
      "src/assets/alarm-clock-ringing-fascinatedsound-1-00-03.mp3"
    );
    audio.play();
  };

  const handleCompletion = () => {
    playSound();

    if (phase === "pomodoro") {
      setPomoCount(prev => {
        const newCount = prev + 1;
        localStorage.setItem("pomoCount", newCount);
        return newCount;
      });

      if ((pomoCount + 1) % 4 === 0) {
        setPhase("longBreak");
        setLongBreakCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem("longBreakCount", newCount);
          return newCount;
        });
      } else {
        setPhase("shortBreak");
        setShortBreakCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem("shortBreakCount", newCount);
          return newCount;
        });
      }
    } else {
      setPhase("pomodoro");
    }
  };

  const handleResetCounters = () => {
    setPomoCount(0);
    setShortBreakCount(0);
    setLongBreakCount(0);
    localStorage.removeItem("pomoCount");
    localStorage.removeItem("shortBreakCount");
    localStorage.removeItem("longBreakCount");
  };

  const updateTitle = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    const phaseLabel =
      phase === "pomodoro"
        ? "Focus"
        : phase === "shortBreak"
        ? "Short Break"
        : "Long Break";

    document.title = `${timeString} - ${phaseLabel}`;
  };

  useEffect(() => {
    updateTitle(remainingTime);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTitle(remainingTimeRef.current);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime, phase]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying && remainingTime > 0) {
        setRemainingTime(prev => {
          const newRemainingTime = prev - 1;
          remainingTimeRef.current = newRemainingTime;
          updateTitle(newRemainingTime);
          return newRemainingTime;
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, remainingTime]);

  return (
    <>
      <div className="flex justify-center items-center gap-4 mb-4">
        <p className="text-xl text-white font-medium bg-grey bg-opacity-30 rounded-md w-56 p-2 flex justify-center">
          Pomodoro: {pomoCount}
        </p>
        <p className="text-xl text-white font-medium bg-grey bg-opacity-30 rounded-md w-56 p-2 flex justify-center">
          Short Break: {shortBreakCount}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-xl text-white font-medium bg-grey bg-opacity-30 rounded-md w-56 p-2 flex justify-center">
            Long Break: {longBreakCount}
          </p>
          <button
            onClick={handleResetCounters}
            className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 pt-5">
        <CountdownCircleTimer
          key={`${timerKey}-${phase}`}
          isPlaying={isPlaying}
          duration={duration}
          colors={"#66666757"}
          size={600}
          strokeWidth={18}
          isSmoothColorTransition
          onUpdate={setRemainingTime}
          onComplete={() => {
            handleCompletion();
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime }) => (
            <div className="flex flex-col items-center">
              <div className="text-6xl text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
                {Math.floor(remainingTime / 60)}:
                {remainingTime % 60 < 10
                  ? `0${remainingTime % 60}`
                  : remainingTime % 60}
              </div>
              <div className="text-md text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
                {phase === "pomodoro"
                  ? "Focus"
                  : phase === "shortBreak"
                  ? "Short Break"
                  : "Long Break"}
              </div>
            </div>
          )}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

export default Timer;
