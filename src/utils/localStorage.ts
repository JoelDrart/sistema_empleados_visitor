// src/utils/localStorage.ts
import { Employee, SalariedEmployee, HourlyEmployee } from "../models/Employee";

const STORAGE_KEY = "employees";

export const saveEmployeesToLocalStorage = (employees: Employee[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

export const loadEmployeesFromLocalStorage = (): Employee[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  const parsedData = JSON.parse(data);
  return parsedData.map((emp: any) =>
    emp.type === "salaried"
      ? new SalariedEmployee(emp.name, emp.salary, emp.monthsWorked)
      : new HourlyEmployee(emp.name, emp.hourlyRate, emp.hoursWorked)
  );
};
