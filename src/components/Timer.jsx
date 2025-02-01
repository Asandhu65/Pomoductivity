import { useEffect, useState, useRef, useCallback } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import PropTypes from "prop-types";
import { Button } from "./ui/button.jsx";
import reset from "/src/assets/reset.svg";

function Timer({
  isPlaying,
  timerKey,
  customDurations = { pomodoro: 1500, shortBreak: 300, longBreak: 900 },
}) {
  const [phase, setPhase] = useState(() => {
    const savedPhase = localStorage.getItem("phase");
    return savedPhase || "pomodoro";
  });

  const [effectiveDurations, setEffectiveDurations] = useState(customDurations);
  const [currentDuration, setCurrentDuration] = useState(
    customDurations.pomodoro
  );

  const currentTimeRef = useRef(currentDuration);
  const currentPhaseRef = useRef(phase);

  const [cyclePosition, setCyclePosition] = useState(() => {
    const savedPosition = localStorage.getItem("cyclePosition");
    return savedPosition ? parseInt(savedPosition, 10) : 0;
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

  useEffect(() => {
    localStorage.setItem("cyclePosition", cyclePosition.toString());
  }, [cyclePosition]);

  useEffect(() => {
    setEffectiveDurations(customDurations);
    setCurrentDuration(customDurations[phase]);
  }, [customDurations, phase]);

  const updateDocumentTitle = useCallback(time => {
    currentTimeRef.current = time;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    const phaseLabels = {
      pomodoro: "Focus",
      shortBreak: "Short Break",
      longBreak: "Long Break",
    };
    document.title = `${timeString} - ${phaseLabels[currentPhaseRef.current]}`;
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const intervalId = setInterval(() => {
          if (isPlaying && currentTimeRef.current > 0) {
            currentTimeRef.current -= 1;
            updateDocumentTitle(currentTimeRef.current);
          }
        }, 1000);

        return () => clearInterval(intervalId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying, updateDocumentTitle]);

  const playSound = () => {
    const audio = new Audio("/alarm-clock-ringing-fascinatedsound-1-00-03.mp3");
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

      if (cyclePosition === 3) {
        setPhase("longBreak");
        currentPhaseRef.current = "longBreak";
        setCurrentDuration(effectiveDurations.longBreak);
      } else {
        setPhase("shortBreak");
        currentPhaseRef.current = "shortBreak";
        setCurrentDuration(effectiveDurations.shortBreak);
      }
    } else {
      if (phase === "shortBreak") {
        setShortBreakCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem("shortBreakCount", newCount);
          return newCount;
        });
        setCyclePosition(prev => prev + 1);
      } else if (phase === "longBreak") {
        setLongBreakCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem("longBreakCount", newCount);
          return newCount;
        });
        setCyclePosition(0);
      }

      setPhase("pomodoro");
      currentPhaseRef.current = "pomodoro";
      setCurrentDuration(effectiveDurations.pomodoro);
    }
  };

  const handlePhaseChange = newPhase => {
    setPhase(newPhase);
    currentPhaseRef.current = newPhase;

    const currentTime = currentTimeRef.current;
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const phaseLabels = {
      pomodoro: "Focus",
      shortBreak: "Short Break",
      longBreak: "Long Break",
    };

    document.title = `${timeString} - ${phaseLabels[newPhase]}`;
    setCurrentDuration(effectiveDurations[newPhase]);
  };

  const handleResetCounters = () => {
    setPomoCount(0);
    setShortBreakCount(0);
    setLongBreakCount(0);
    setCyclePosition(0);
    localStorage.removeItem("pomoCount");
    localStorage.removeItem("shortBreakCount");
    localStorage.removeItem("longBreakCount");
    localStorage.removeItem("cyclePosition");
    setCurrentDuration(effectiveDurations[phase]);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 mb-4">
        <Button
          onClick={() => handlePhaseChange("pomodoro")}
          className={`[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] text-xl text-white font-medium rounded-md w-56 p-2 flex justify-center transition-colors ${
            phase === "pomodoro"
              ? "bg-grey bg-opacity-80"
              : "bg-grey bg-opacity-30 hover:bg-opacity-40"
          }`}
        >
          Pomodoro: {pomoCount}
        </Button>
        <Button
          onClick={() => handlePhaseChange("shortBreak")}
          className={`[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] text-xl text-white font-medium rounded-md w-56 p-2 flex justify-center transition-colors ${
            phase === "shortBreak"
              ? "bg-grey bg-opacity-80"
              : "bg-grey bg-opacity-30 hover:bg-opacity-40"
          }`}
        >
          Short Break: {shortBreakCount}
        </Button>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePhaseChange("longBreak")}
            className={`[text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)] text-xl text-white font-medium rounded-md w-56 p-2 flex justify-center transition-colors ${
              phase === "longBreak"
                ? "bg-grey bg-opacity-80"
                : "bg-grey bg-opacity-30 hover:bg-opacity-40"
            }`}
          >
            Long Break: {longBreakCount}
          </Button>
          <Button
            onClick={handleResetCounters}
            className="bg-grey bg-opacity-80 text-white text-sm px-4 py-2 rounded-md hover:bg-opacity-40 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]"
          >
            <img src={reset} className="w-4 h-4 stroke-7" />
            Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 pt-5 custom-timer">
        <CountdownCircleTimer
          key={`${timerKey}-${phase}`}
          isPlaying={isPlaying}
          duration={currentDuration}
          colors={["#D9D9D9"]}
          trailColor="#3C3C3D"
          size={600}
          strokeWidth={18}
          strokeLinecap="round"
          onComplete={() => {
            handleCompletion();
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime }) => {
            updateDocumentTitle(remainingTime);
            return (
              <div className="flex flex-col items-center">
                <div className="text-9xl font-bold text-white text-opacity-80 [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
                  {Math.floor(remainingTime / 60)}:
                  {remainingTime % 60 < 10
                    ? `0${remainingTime % 60}`
                    : remainingTime % 60}
                </div>
                <div className="text-3xl text-white [text-shadow:_2.5px_2px_3px_rgb(0_0_0_/_100%)]">
                  {phase === "pomodoro"
                    ? "Focus"
                    : phase === "shortBreak"
                    ? "Short Break"
                    : "Long Break"}
                </div>
              </div>
            );
          }}
        </CountdownCircleTimer>
      </div>
    </>
  );
}

Timer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  timerKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  customDurations: PropTypes.shape({
    pomodoro: PropTypes.number,
    shortBreak: PropTypes.number,
    longBreak: PropTypes.number,
  }),
};

Timer.defaultProps = {
  customDurations: {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  },
};

export default Timer;
