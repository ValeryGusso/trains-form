import React, { FC } from 'react';
import cls from './selectTable.module.scss';
import { ITrain } from '../../redux/slices/trains/types';

interface SelectTableProps {
	title: string;
	selected: number | null;
	legend: string[];
	data: ITrain[];
	onClick: (i: number) => void;
}

const SelectTable: FC<SelectTableProps> = React.memo(({ title, selected, legend, data, onClick }) => {
	return (
		<div className={cls.container}>
			<h2 className={cls.title}>{title}</h2>
			<table className={cls.table}>
				<thead>
					<tr>
						{legend.map((title, i) => (
							<th key={i}>{title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((train, i) => (
						<tr key={train.name} onClick={() => onClick(i)} className={selected === i ? cls.selected : undefined}>
							<td>{train.name}</td>
							<td>{train.description}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
});

export default SelectTable;
