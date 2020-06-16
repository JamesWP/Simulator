import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { vmSlice } from "../JavascriptVM/vmSlice";
import { ExecutionState } from "../JavascriptVM/vm";

/**
 * Reducers for handling the state of the blockly interface such as which blocks are highlighted.
 */
export const blocklySlice = createSlice({
  initialState: {
    /** The id of the block to highlight - empty string means no block is highlighted */
    highlightedBlock: "",
  },
  name: "blockly",
  reducers: {
    highlightBlock(state, action: PayloadAction<{ blockId: string }>) {
      state.highlightedBlock = action.payload.blockId;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(vmSlice.actions.setExecutionState, (state, action) => {
      if (
        action.payload.executionState === ExecutionState.STOPPED ||
        action.payload.executionState === ExecutionState.STARTED ||
        action.payload.executionState === ExecutionState.NONE
      ) {
        // Passing a fake block id guarantees to unhighlight all blocks
        state.highlightedBlock = "UNHIGHLIGHT_BLOCKS";
      }

      return state;
    });
  },
});

/**
 * Retrieves the ID of the highlighted block.
 *
 * @param state the root state of the application
 *
 * @returns the highlighted block id
 */
export const getHighlightedBlockId = (state: RootState) =>
  state.blockly.highlightedBlock;
