import { MutationTree } from 'vuex';
import { EmployeesState, Employee } from './types';

export const mutations: MutationTree<EmployeesState> = {
    setEmployees(state, employees: Employee[]) {
    		state.employees = employees;
    }
};