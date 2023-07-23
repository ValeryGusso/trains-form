import { useDispatch } from 'react-redux';
import { TypeDispatch } from '../redux';

const useTypedDispatch: () => TypeDispatch = useDispatch;

export default useTypedDispatch;
