import React, { FC, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cls from './editTable.module.scss';
import Row from './row/row';
import Button from '../UI/button/button';
import { Characteristic } from '../../redux/slices/trains/types';
import { characterisReducers, characterisSelector, isValidSelector } from '../../redux/slices/characteristics';
import useTypedDispatch from '../../hooks/useTypedDispatsh';

interface EditTableProps {
	title: string;
	name: string;
	data: Characteristic[];
	onClose: () => void;
}

const EditTable: FC<EditTableProps> = React.memo(({ title, name, data, onClose }) => {
	const dispatch = useTypedDispatch();
	const values = useSelector(characterisSelector).data;
	const isValid = useSelector(isValidSelector);
	const [precision, setPrecision] = useState(2);

	const submit = useCallback(() => {
		console.log([...values].sort((a, b) => a.speed - b.speed));
	}, [values]);

	const reset = useCallback(() => {
		dispatch(characterisReducers.reset());
	}, []);

	function changePrecision(type: 'inc' | 'dec') {
		setPrecision(prev => {
			switch (type) {
				case 'inc':
					if (prev >= 4) return 4;
					return prev + 1;

				case 'dec':
					if (prev <= 2) return 2;
					return prev - 1;
			}
		});
	}

	function printPrecision() {
		const nulls = '0'.repeat(precision - 1);
		return `0,${nulls}1`;
	}

	return (
		<div className={cls.container}>
			<div className={cls.header}>
				<h2>{title}</h2>
				<h3>{name}</h3>
				<div title="Закрыть" onClick={onClose} />
			</div>
			<table className={cls.table}>
				<thead>
					<tr>
						<th>Скорость, км/ч</th>
						<th>
							Сила тяги, kH
							<br />
							<span className={cls.precision}>
								точность {printPrecision()}
								<div
									onClick={() => changePrecision('inc')}
									className={precision === 4 ? cls.locked : undefined}
									title="Увеличить"
								/>
								<div
									onClick={() => changePrecision('dec')}
									className={precision === 2 ? cls.locked : undefined}
									title="Уменьшить"
								/>
							</span>
						</th>
						<th>Ток двигателя, A</th>
					</tr>
				</thead>
				<tbody>
					{data.map((_, i) => (
						<Row index={i} key={i} precision={precision} />
					))}
				</tbody>
			</table>
			<div className={cls.buttons}>
				<Button text="Сбросить" isValid={true} onClick={reset} />
				<Button text="Отправить данные" isValid={isValid} onClick={submit} />
			</div>
		</div>
	);
});

export default EditTable;
