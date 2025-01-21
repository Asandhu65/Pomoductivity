import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// eslint-disable-next-line react/prop-types
function Timer({ isPlaying, timerKey }) {
  const [phase, setPhase] = useState("pomodoro");
  const [duration, setDuration] = useState(() => {
    const savedPhase = localStorage.getItem("currentPhase");
    if (savedPhase) {
      return JSON.parse(localStorage.getItem("currentDurations"))[savedPhase];
    }
    return 1500;
  });
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

  const durations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const playSound = () => {
    const audio = new Audio(
      "src/assets/alarm-clock-ringing-fascinatedsound-1-00-03.mp3"
    );
    audio.play();
  };

  const handleCompletion = () => {
    playSound();

    if (phase === "pomodoro") {
      setPomoCount(prev => prev + 1);
      localStorage.setItem("pomoCount", pomoCount + 1);

      if ((pomoCount + 1) % 4 === 0) {
        setPhase("longBreak");
        setLongBreakCount(prev => prev + 1);
        localStorage.setItem("longBreakCount", longBreakCount + 1);
        setRemainingTime(durations.longBreak);
      } else {
        setPhase("shortBreak");
        setShortBreakCount(prev => prev + 1);
        localStorage.setItem("shortBreakCount", shortBreakCount + 1);
        setRemainingTime(durations.shortBreak);
      }
    } else if (phase === "shortBreak" || phase === "longBreak") {
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
  };

  useEffect(() => {
    setDuration(durations[phase]);
    setRemainingTime(durations[phase]);
    localStorage.setItem("currentPhase", phase);
    localStorage.setItem("currentDurations", JSON.stringify(durations));
  }, [phase]);

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
    document.title = `${Math.floor(remainingTime / 60)}:${
      remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60
    } - ${
      phase === "pomodoro"
        ? "Focus"
        : phase === "shortBreak"
        ? "Short Break"
        : "Long Break"
    }`;
  }, [remainingTime, phase]);

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
          key={timerKey + phase}
          isPlaying={isPlaying}
          duration={duration}
          colors={"#66666757"}
          size={600}
          strokeWidth={18}
          isSmoothColorTransition
          onUpdate={time => setRemainingTime(time)}
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
