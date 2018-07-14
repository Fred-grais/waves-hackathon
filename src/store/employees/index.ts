import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { EmployeesState } from './types';
import { RootState } from '../types';

export const state: EmployeesState = {
    employees: []
};

const namespaced: boolean = true;

export const employeesState: Module<EmployeesState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};