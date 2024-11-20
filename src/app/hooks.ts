import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

// Custom hook for accessing the Redux dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for selecting state from Redux store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
