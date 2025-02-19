export interface AddSalariedEmployeeDto {
    id: string;
    name: string;
    salary: number;
    monthsWorked: number;
}

export interface AddHourlyEmployeeDto {
    id: string;
    name: string;
    hourlyRate: number;
    hoursWorked: number;
}

export interface SalariedEmployeeDto {
    employeeId: string;
    salary: number;
    monthsWorked: number;
}

export interface HourlyEmployeeDto {
    employeeId: string;
    hourlyRate: number;
    hoursWorked: number;
}

export interface EmployeeResponseDto {
    id: string;
    name: string;
    type: "ASALARIADO" | "POR_HORAS";
    salaried?: SalariedEmployeeDto | null;
    hourly?: HourlyEmployeeDto | null;
}
