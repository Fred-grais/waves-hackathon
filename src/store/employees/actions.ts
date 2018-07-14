import { ActionTree } from 'vuex';
import { EmployeesState, Employee } from './types';
import { RootState } from '../types';


export const actions: ActionTree<EmployeesState, RootState> = {
    fetchData({ commit }): any {
        const employees = [
            {
                firstName: 'Bob',
                lastName: 'Dole',
                position: 'Accountant',
                salary: 1,
                email: 'bobby@yopmail.com',
                phone: '0102030405',
                wavesAddress: '3Mx6PQDSeFJ32kJPv7gbhunFBeJk3DC2pKM'
            },
            {
                firstName: 'John',
                lastName: 'Hil',
                position: 'IT',
                salary: 2,
                email: 'johny@yopmail.com',
                phone: '1112131415',
                wavesAddress: '3N5ADoYAiPFMvjiq4QQKQuiK3oErLWZgqgh'
            },
            {
                firstName: 'Paul',
                lastName: 'Dek',
                position: 'Marketing',
                salary: 2,
                email: 'paul@yopmail.com',
                phone: '2122232425',
                wavesAddress: '3N8LvhCxYGV4k7uY6M2gLv3PSG4pHjEyKgc'
            },
            {
                firstName: 'Sophie',
                lastName: 'Clark',
                poistion: 'Sales',
                salary: 1,
                email: 'sophie@yopmail.com',
                phone: '3132333435',
                wavesAddress: '3MspNAYaR9gEy9o1PX3YZVMNVRqpa7khr7B'
            },
            {
                firstName: 'Homer',
                lastName: 'Simpson',
                position: 'Sales',
                salary: 2,
                email: 'homer@yopmail.com',
                phone: '4142434445',
                wavesAddress: '3MwE2MmQwedvQmHMpcVKnyCrVbbPfmbxMdz'
            }
        ]

        commit('setEmployees', employees);
    }
};