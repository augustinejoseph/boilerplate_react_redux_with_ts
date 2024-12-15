import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
export type InitState = {
  count: number;
  loading: boolean;
  error: string | null;
};

// Initial state
const initState: InitState = {
  count: 0,
  loading: false,
  error: null,
};

// Async thunk for demonstration (e.g., mock API call)
export const updateCount = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("app/updateCount", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error(error);
    return rejectWithValue("API request failed");
  }
});

// Slice definition
const appSlice = createSlice({
  name: "App",
  initialState: initState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export actions for local state management
export const { increment, decrement, reset, setLoading } = appSlice.actions;

// Export reducer
export default appSlice.reducer;
