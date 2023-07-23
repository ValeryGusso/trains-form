import { Characteristic } from '../trains/types';

export interface CharacteristicsSliceState {
	original: Characteristic[];
	data: Characteristic[];
}
