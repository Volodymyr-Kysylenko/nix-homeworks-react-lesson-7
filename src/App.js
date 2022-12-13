import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setIsActive,
  selectIsActive,
  setIsPaused,
  selectIsPaused,
  setStopwatch,
  updateStopwatch,
  selectStopwatch,
  setResults,
  updateResults,
  selectResults,
  setRunner,
  updateRunner,
  selectRunner
} from './app/slices';

function App() {
  const dispatch = useDispatch();

  const isActive = useSelector(selectIsActive);
  const isPaused = useSelector(selectIsPaused);
  const stopwatch = useSelector(selectStopwatch);
  const results = useSelector(selectResults);
  const runner = useSelector(selectRunner);

  const [border, setBorder] = useState(880);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        dispatch(updateStopwatch(10));
        setBorder(current => (current >= 880 * 2) ? 880 : current + 2 * 140 * Math.PI / 6000)
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  function startStopwatch() {
    dispatch(setIsActive(true));
    dispatch(setIsPaused(false));
  };

  function pauseStopwatch() {
    dispatch(setIsPaused(!isPaused));
  };

  function resetStopwatch() {
    dispatch(setIsActive(false));
    dispatch(setStopwatch(0));
    dispatch(setResults([]));
    dispatch(setRunner(1));
    setBorder(880);
  };

  function stopStopwatch() {
    dispatch(setIsActive(false));
    dispatch(setStopwatch(0));
    setBorder(880);
  }

  function saveStopwatchTime() {
    dispatch(updateResults({ time: stopwatch, runner: runner }));
    dispatch(updateRunner({}));
  }

  return (
    <div className='app'>
      <div>
        <h1>
          Running Stopwatch
        </h1>
      </div>
      <div className='stopwatch'>
        <p>
          <span>
            {('0' + Math.floor((stopwatch / 3600000) % 60)).slice(-2)}:
          </span>
          <span>
            {('0' + Math.floor((stopwatch / 60000) % 60)).slice(-2)}:
          </span>
          <span>
            {('0' + Math.floor((stopwatch / 1000) % 60)).slice(-2)}.
          </span>
          <span>
            {('0' + ((stopwatch / 10) % 100)).slice(-2)}
          </span>
        </p>
        <svg>
          <circle style={{ strokeDashoffset: border + 'px' }} r="140" cx="142" cy="142"></circle>
        </svg>
      </div>
      <div className='stopwatch-buttons'>
        <button onClick={startStopwatch} disabled={(!isPaused && isActive) ? true : false}>
          Start
        </button>
        <button onClick={pauseStopwatch}>
          Pause
        </button>
        <button onClick={stopStopwatch}>
          Stop
        </button>
        <button onClick={saveStopwatchTime}>
          Save Time
        </button>
        <button onClick={resetStopwatch}>
          Reset
        </button>
      </div>
      <div className='results'>
        <h2>
          Results
        </h2>
        {
          results.map((result, index) => {
            return <p key={index}>{index + 1} place, runner №{result.runner}, {('0' + Math.floor((result.time / 3600000) % 60)).slice(-2) + ':'
              + ('0' + Math.floor((result.time / 60000) % 60)).slice(-2) + ':'
              + ('0' + Math.floor((result.time / 1000) % 60)).slice(-2) + '.'
              + ('0' + ((result.time / 10) % 100)).slice(-2)}</p>
          })
        }
        {
          (results.length === 0) ? <h3>No result yet</h3> : null
        }
      </div>
    </div>
  );
}

export default App;
