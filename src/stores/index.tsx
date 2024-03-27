import appStore from './appStore';
import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();
export const store = configureStore({
  reducer: {
    appStore: appStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
