import { configureStore  } from '@reduxjs/toolkit';
import mainInterfaceReducer from './mainInterface';



export const store = configureStore({
  reducer: {
    mainInterfaceActiveTabIndex: mainInterfaceReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch