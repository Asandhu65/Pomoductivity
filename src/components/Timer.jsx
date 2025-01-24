/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Timer({
  isPlaying,
  timerKey,
  customDurations = { pomodoro: 1500, shortBreak: 300, longBreak: 900 },
  isCustomSelected,
}) {
  const [phase, setPhase] = useState(() => {
    const savedPhase = localStorage.getItem("phase");
    return savedPhase || "pomodoro";
  });

  const storedDurations = JSON.parse(localStorage.getItem("customDurations"));
  const effectiveDurations = storedDurations || customDurations;

  const [remainingTime, setRemainingTime] = useState(() => {
    const savedRemainingTime = localStorage.getItem("remainingTime");
    return savedRemainingTime
      ? parseInt(savedRemainingTime, 10)
      : effectiveDurations[phase];
  });

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
      pomodoro: effectiveDurations.pomodoro || 1500,
      shortBreak: effectiveDurations.shortBreak || 300,
      longBreak: effectiveDurations.longBreak || 900,
    }),
    [effectiveDurations]
  );

  const remainingTimeRef = useRef(remainingTime);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("remainingTime", remainingTime);
    localStorage.setItem("phase", phase);
  }, [remainingTime, phase]);

  // Reset remainingTime whenever phase or durations change
  useEffect(() => {
    const updatedDuration = durations[phase];
    if (updatedDuration) {
      setRemainingTime(updatedDuration);
    }
  }, [phase, durations]);

  // Update remainingTime when the radio button for custom timer is selected
  useEffect(() => {
    if (!isCustomSelected) {
      setPhase("pomodoro");
      setRemainingTime(durations.pomodoro);
    }
  }, [isCustomSelected, durations]);

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
        setRemainingTime(durations.longBreak);
      } else {
        setPhase("shortBreak");
        setShortBreakCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem("shortBreakCount", newCount);
          return newCount;
        });
        setRemainingTime(durations.shortBreak);
      }
    } else {
      setPhase("pomodoro");
      setRemainingTime(durations.pomodoro);
    }
  };

  const handleResetCounters = () => {
    setPomoCount(0);
    setShortBreakCount(0);
    setLongBreakCount(0);
    localStorage.removeItem("pomoCount");
    localStorage.removeItem("shortBreakCount");
    localStorage.removeItem("longBreakCount");

    // Reset to the default duration based on the current phase
    setRemainingTime(durations[phase]);
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
  }, [remainingTime, phase]);

  // UseEffect to handle play/pause logic
  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(prev => {
            const newRemainingTime = prev - 1;
            remainingTimeRef.current = newRemainingTime;
            updateTitle(newRemainingTime);
            return newRemainingTime;
          });
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
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
          key={timerKey} // Ensure the timer resets when the key changes
          isPlaying={isPlaying}
          duration={remainingTime}
          colors={"#66666757"}
          size={600}
          strokeWidth={18}
          isSmoothColorTransition
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
} // test
export default Timer;
