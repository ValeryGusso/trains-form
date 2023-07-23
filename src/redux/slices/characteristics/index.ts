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

export const characterisReducers = characteristicsSlice.actions;

export const characterisSelector = (state: RootState) => state.characteris;
export const isValidSelector = (state: RootState) => {
	return !state.characteris.data?.some(
		characteristic =>
			characteristic.speed < 0 ||
			characteristic.force <= 0 ||
			characteristic.engineAmperage <= 0 ||
			!Number.isInteger(characteristic.speed) ||
			!Number.isInteger(characteristic.engineAmperage)
	);
};

export default characteristicsSlice.reducer;
