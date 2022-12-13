import { combineReducers, createSlice } from '@reduxjs/toolkit';

export const isActiveReducer = createSlice({
  name: 'isActive',
  initialState: { value: false },
  reducers: {
    setIsActive: (state, action) => {
      state.value = action.payload;
    }
  }
});
export const { setIsActive } = isActiveReducer.actions;
export const selectIsActive = (state) => state.isActive.value;

export const isPausedReducer = createSlice({
  name: 'isPaused',
  initialState: { value: true },
  reducers: {
    setIsPaused: (state, action) => {
      state.value = action.payload;
    }
  }
});
export const { setIsPaused } = isPausedReducer.actions;
export const selectIsPaused = (state) => state.isPaused.value;

export const stopwatchReducer = createSlice({
  name: 'stopwatch',
  initialState: { value: 0 },
  reducers: {
    setStopwatch: (state, action) => {
      state.value = action.payload;
    },
    updateStopwatch: (state, action) => {
      state.value = state.value + action.payload;
    }
  }
});
export const { setStopwatch, updateStopwatch } = stopwatchReducer.actions;
export const selectStopwatch = (state) => state.stopwatch.value;

export const resultsReducer = createSlice({
  name: 'results',
  initialState: { value: [] },
  reducers: {
    setResults: (state, action) => {
      state.value = action.payload;
    },
    updateResults: (state, action) => {
      state.value = [...state.value, action.payload].sort((a, b) => a.time - b.time);
    }
  }
});
export const { setResults, updateResults } = resultsReducer.actions;
export const selectResults = (state) => state.results.value;

export const runnerReducer = createSlice({
  name: 'runner',
  initialState: { value: 1 },
  reducers: {
    setRunner: (state, action) => {
      state.value = action.payload;
    },
    updateRunner: (state, action) => {
      state.value = state.value + 1;
    }
  }
});
export const { setRunner, updateRunner } = runnerReducer.actions;
export const selectRunner = (state) => state.runner.value;

export default combineReducers({
  isActive: isActiveReducer.reducer,
  isPaused: isPausedReducer.reducer,
  stopwatch: stopwatchReducer.reducer,
  results: resultsReducer.reducer,
  runner: runnerReducer.reducer
});
