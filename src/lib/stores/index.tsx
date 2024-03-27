import appStore from './appStore';
import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

enableMapSet();
export const makeStore = () => {
  return configureStore({
    reducer: {
      appStore: appStore,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
