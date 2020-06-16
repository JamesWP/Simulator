import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ExecutionState } from "./vm";

/**
 * Reducer responsible for the execution of the JS
 */
export const vmSlice = createSlice({
  name: "vm",
  initialState: {
    code: null as string | null,
    executionState: ExecutionState.NONE,
  },
  reducers: {
    setExecutionState(
      state,
      action: PayloadAction<{ executionState: ExecutionState }>
    ) {
      state.executionState = action.payload.executionState;
      return state;
    },
    setCode(state, action: PayloadAction<{ code: string }>) {
      state.code = action.payload.code;
      return state;
    },
  },
});

export const getExecutionState = (state: RootState) => state.vm.executionState;

/**
 * Returns whether the interpreter has been started or not.
 *
 * @param state the root state of the application
 *
 * @returns true if the interpreter is started, false otherwise.
 */
export const isExecuting = (state: RootState) =>
  state.vm.executionState !== ExecutionState.STOPPED &&
  state.vm.executionState !== ExecutionState.NONE;

/**
 * Retrieves the current JS code generated by blockly.
 *
 * @param state the root state of the application
 *
 * @returns the code as a string
 */
export const getCode = (state: RootState) => state.vm.code;
