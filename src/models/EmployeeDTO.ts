export interface AddSalariedEmployeeDto {
    id: string;
    name: string;
    salary: number;
    monthsWorked: number;
    telefono: string;
    email: string;
    especialidad: string;
    cedula: string;
    horario_inicio: string;
    horario_fin: string;
    duracion_cita: number;
    activo: boolean;
}

export interface AddHourlyEmployeeDto {
    id: string;
    name: string;
    hourlyRate: number;
    hoursWorked: number;
    telefono: string;
    email: string;
    especialidad: string;
    cedula: string;
    horario_inicio: string;
    horario_fin: string;
    duracion_cita: number;
    activo: boolean;
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
    telefono: string;
    email: string;
    especialidad: string;
    cedula: string;
    horario_inicio: string;
    horario_fin: string;
    duracion_cita: number;
    activo: boolean;
    salaried?: SalariedEmployeeDto | null;
    hourly?: HourlyEmployeeDto | null;
}
