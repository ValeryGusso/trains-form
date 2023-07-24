import React, { FC } from 'react';
import Input from '../../UI/input/input';

interface RowProps {
	index: number;
	precision: number;
}

const Row: FC<RowProps> = React.memo(({ index, precision }) => {
	return (
		<tr>
			<td>
				<Input model="speed" index={index} precision={precision} message="Только положительные значения" />
			</td>
			<td>
				<Input model="force" index={index} precision={precision} message="Значение не может быть 0" />
			</td>
			<td>
				<Input model="engineAmperage" index={index} precision={precision} message="Значение не может быть 0" />
			</td>
		</tr>
	);
});

export default Row;
