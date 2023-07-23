import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITrain, STATUS, TrainsSliceState } from './types';
import { RootState } from '../..';

export const fetchTrains = createAsyncThunk('trains/fetchTrains', async (): Promise<ITrain[]> => {
	const res = await fetch(process.env.REACT_APP_DATA_URL!);

	const data = (await res.json()) as ITrain[];

	if (res.ok && res.status === 200) {
		return data.filter(train => {
			return train.characteristics?.some(char => {
				return (
					typeof char.speed !== 'undefined' &&
					typeof char.force !== 'undefined' &&
					typeof char.engineAmperage !== 'undefined'
				);
			});
		});
	}
	return [];
});

const initialState: TrainsSliceState = {
	status: STATUS.INIT,
	loading: false,
	data: [],
};

const trainsSlice = createSlice({
	name: 'trains',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchTrains.pending, state => {
			state.status = STATUS.PENDING;
			state.loading = true;
			state.data = [];
		});
		builder.addCase(fetchTrains.fulfilled, (state, action: PayloadAction<ITrain[]>) => {
			state.status = STATUS.FULLFILED;
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchTrains.rejected, state => {
			state.status = STATUS.ERROR;
			state.loading = false;
			state.data = [];
		});
	},
});

export const trainsSelector = (state: RootState) => state.trains;

export default trainsSlice.reducer;
