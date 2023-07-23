import { ChangeEvent, FC } from 'react';
import { useSelector } from 'react-redux';
import cls from './input.module.scss';
import { characterisReducers, characterisSelector } from '../../../redux/slices/characteristics';
import { Characteristic } from '../../../redux/slices/trains/types';
import useTypedDispatch from '../../../hooks/useTypedDispatsh';

interface InputProps {
	model: keyof Characteristic;
	index: number;
	precision: number;
	message: string;
}

const Input: FC<InputProps> = ({ model, index, precision, message }) => {
	const dispatch = useTypedDispatch();
	const value = useSelector(characterisSelector).data[index][model];

	function change(e: ChangeEvent<HTMLInputElement>) {
		if (parseFloat(e.target.value) < 0) return;

		switch (model) {
			case 'speed':
				dispatch(characterisReducers.setSpeed({ index, value: parseInt(e.target.value) }));
				break;
			case 'force':
				dispatch(characterisReducers.setForce({ index, value: parseFloat((+e.target.value).toFixed(precision)) }));
				break;
			case 'engineAmperage':
				dispatch(characterisReducers.setAmperage({ index, value: parseInt(e.target.value) }));
				break;
		}
	}

	function blur() {
		if (!value) {
			switch (model) {
				case 'speed':
					dispatch(characterisReducers.setSpeed({ index, value: 0 }));
					break;
				case 'force':
					dispatch(characterisReducers.setForce({ index, value: 0 }));
					break;
				case 'engineAmperage':
					dispatch(characterisReducers.setAmperage({ index, value: 0 }));
					break;
			}
		}
	}

	function invalidValue() {
		switch (model) {
			case 'force':
			case 'engineAmperage':
				return value <= 0;

			case 'speed':
				return value < 0;
		}
	}

	return (
		<label className={cls.container}>
			{invalidValue() && <p className={cls.message}>{message}</p>}
			<input
				value={value.toString().replace(/^(0)\d+/, '')}
				onInput={change}
				onBlur={blur}
				type="number"
				className={cls.input}
				step={model === 'force' ? Math.pow(10, -precision) : 1}
				min="0"
			/>
		</label>
	);
};

export default Input;
