import { GetterTree } from 'vuex';
import { EmployeesState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<EmployeesState, RootState> = {
    getEmployees(state) {
    	const {employees} = state;

    	return employees;
    }
};