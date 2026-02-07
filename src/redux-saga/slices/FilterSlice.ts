import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { FilterType } from "../../features/movies/types/FilterType";

interface FilterState {
  filter: FilterType;
  query?: string;
}

const initialState: FilterState = {
  filter: FilterType.Popular,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (
      state,
      action: PayloadAction<{ filter: FilterType; query?: string }>,
    ) => {
      state.filter = action.payload.filter;
      if (action.payload.query) {
        state.query = action.payload.query;
      }
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;

export const selectFilter = (state: ReturnType<typeof store.getState>) =>
  state.filter.filter;
