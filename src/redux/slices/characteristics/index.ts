import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacteristicsSliceState } from './types';
import { Characteristic } from '../trains/types';
import { RootState } from '../..';

const initialState: CharacteristicsSliceState = {
	original: [],
	data: [],
};

const characteristicsSlice = createSlice({
	name: 'characteristics',
	initialState,
	reducers: {
		init(state, action: PayloadAction<Characteristic[]>) {
			state.data = structuredClone(action.payload);
			state.original = structuredClone(action.payload);
		},

		reset(state) {
			state.data = state.original;
		},

		setSpeed(state, action: PayloadAction<{ index: number; value: number }>) {
			if (action.payload.index >= 0 && action.payload.index < state.data.length) {
				state.data[action.payload.index].speed = action.payload.value;
			}
		},

		setForce(state, action: PayloadAction<{ index: number; value: number }>) {
			if (action.payload.index >= 0 && action.payload.index < state.data.length) {
				state.data[action.payload.index].force = action.payload.value;
			}
		},

		setAmperage(state, action: PayloadAction<{ index: number; value: number }>) {
			if (action.payload.index >= 0 && action.payload.index < state.data.length) {
				state.data[action.payload.index].engineAmperage = action.payload.value;
			}
		},
	},
});

export const characteristicsReducers = characteristicsSlice.actions;

export const characteristicsSelector = (state: RootState) => state.characteristics.data;
export const valueSelector = (index: number, model: keyof Characteristic) => {
	return (state: RootState) => state.characteristics.data[index][model];
};
export const isValidSelector = (state: RootState) => {
	return !state.characteristics.data?.some(
		characteristic =>
			characteristic.speed < 0 ||
			characteristic.force <= 0 ||
			characteristic.engineAmperage <= 0 ||
			!Number.isInteger(characteristic.speed) ||
			!Number.isInteger(characteristic.engineAmperage)
	);
};

export default characteristicsSlice.reducer;
