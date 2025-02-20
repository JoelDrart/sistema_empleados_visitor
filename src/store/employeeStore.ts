// src/store/employeeStore.ts
import { create } from "zustand";
import { Employee, SalariedEmployee, HourlyEmployee } from "../models/Employee";

interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    setEmployees: (employees: Employee[]) => void;
    addEmployee: (employee: Employee) => void;
    updateEmployee: (updatedEmployee: Employee) => void;
    deleteEmployee: (employeeId: string) => void;
    setLoading: (loading: boolean) => void;
}

const useEmployeeStore = create<EmployeeState>((set) => ({
    employees: [],
    loading: true,
    setEmployees: (employees) => set({ employees }),
    addEmployee: (employee) =>
        set((state) => ({ employees: [...state.employees, employee] })),
    updateEmployee: (updatedEmployee) =>
        set((state) => ({
            employees: state.employees.map((emp) =>
                emp.id === updatedEmployee.id ? updatedEmployee : emp
            ),
        })),
    deleteEmployee: (employeeId) =>
        set((state) => ({
            employees: state.employees.filter((emp) => emp.id !== employeeId),
        })),
    setLoading: (loading) => set({ loading }),
}));

export default useEmployeeStore;