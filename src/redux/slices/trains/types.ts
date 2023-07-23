export enum STATUS {
	INIT = 'INIT',
	PENDING = 'PENDING',
	FULLFILED = 'FULLFILED',
	ERROR = 'ERROR',
}

export interface ITrain {
	name: string;
	description: string;
	characteristics: Characteristic[];
}

export interface Characteristic {
	speed: number;
	force: number;
	engineAmperage: number;
}

export interface TrainsSliceState {
	status: STATUS;
	loading: boolean;
	data: ITrain[];
}
