import { configureStore } from '@reduxjs/toolkit';
import trains from './slices/trains';
import characteristics from './slices/characteristics';

const store = configureStore({
	reducer: { trains, characteristics },
});

export type RootState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;

export default store;
