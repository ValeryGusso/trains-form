import { configureStore } from '@reduxjs/toolkit';
import trains from './slices/trains';
import characteris from './slices/characteristics';

const store = configureStore({
	reducer: { trains, characteris },
});

export type RootState = ReturnType<typeof store.getState>;
export type TypeDispatch = typeof store.dispatch;

export default store;
