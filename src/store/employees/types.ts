export interface Employee {
    firstName: string;
    lastName: string;
    position: string;
    salary: number;
    email: string;
    phone?: string;
    wavesAddress: string;
}

export interface EmployeesState {
    employees: Employee[];
}