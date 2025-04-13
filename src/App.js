import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Two-digit milliseconds
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const startStopwatch = () => setIsRunning(true);
  const pauseStopwatch = () => setIsRunning(false);
  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };
  const recordLap = () => {
    setLapTimes([...lapTimes, formatTime(time)]);
  };

  return (
    <div className="stopwatch-container">
      <h1>Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startStopwatch} disabled={isRunning}>
          Start
        </button>
        <button onClick={pauseStopwatch} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={resetStopwatch}>Reset</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
      </div>
      <div className="lap-times">
        <h3>Lap Times</h3>
        <ul>
          {lapTimes.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {lap}</li>
          ))}
        </ul>
      </div>
      {!isRunning && time > 0 && <p>Stopwatch Paused</p>}
    </div>
  );
}

export default App;