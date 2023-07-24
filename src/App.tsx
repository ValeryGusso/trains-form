import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import SelectTable from './components/selectTable/selectTable';
import EditTable from './components/editTable/editTable';
import { fetchTrains, trainsSelector } from './redux/slices/trains';
import { characteristicsReducers } from './redux/slices/characteristics';
import useTypedDispatch from './hooks/useTypedDispatsh';

function App() {
	const dispatch = useTypedDispatch();
	const data = useSelector(trainsSelector).data;
	const loading = useSelector(trainsSelector).loading;
	const [selected, setSelected] = useState<number | null>(null);

	const selectTable = useCallback(
		(i: number) => {
			setSelected(i);
			if (Array.isArray(data[i]?.characteristics)) {
				dispatch(characteristicsReducers.init(data[i].characteristics));
			}
		},
		[selected, data]
	);

	const close = useCallback(() => {
		setSelected(null);
	}, []);

	useEffect(() => {
		dispatch(fetchTrains());
	}, []);

	return (
		<main>
			{loading ? (
				<p>Loading</p>
			) : (
				<SelectTable
					title="Поезда"
					legend={['Название', 'Описание']}
					selected={selected}
					data={data}
					onClick={selectTable}
				/>
			)}
			{selected !== null && !!data[selected] && (
				<EditTable
					title="Характеристики"
					name={data[selected].name}
					data={data[selected].characteristics}
					onClose={close}
				/>
			)}
		</main>
	);
}

export default App;
