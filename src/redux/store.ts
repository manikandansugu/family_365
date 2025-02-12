import {configureStore} from '@reduxjs/toolkit';
import OrphanageReducer from './slices/dataSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    orphanageDetails: OrphanageReducer,
    authSlice: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
