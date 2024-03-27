import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
type APPSTATE = {
  isLogined: boolean;
  isRouteLoading: boolean;
};

const initialState: APPSTATE = {
  isLogined: false,
  isRouteLoading: false,
};
export const appStore = createSlice({
  name: 'appStore',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isRouteLoading = action.payload;
    },
  },
});
export const { setLoading } = appStore.actions;
export default appStore.reducer;
