// Interfaz base para empleados

export interface Employee {
    accept(visitor: EmployeeVisitor): number;
    id: string;
    name: string;
    telefono: string;
    email: string;
    especialidad: string;
    cedula: string;
    horario_inicio: string;
    horario_fin: string;
    duracion_cita: number;
    activo: boolean;
    getType(): string; // Método para obtener el tipo de empleado
}

// Empleado asalariado
export class SalariedEmployee implements Employee {
    constructor(
        public id: string,
        public name: string,
        public salary: number,
        public monthsWorked: number = 1,
        public telefono: string = "",
        public email: string = "",
        public especialidad: string = "",
        public cedula: string = "",
        public horario_inicio: string = "08:00",
        public horario_fin: string = "17:00",
        public duracion_cita: number = 30,
        public activo: boolean = true
    ) {}

    accept(visitor: EmployeeVisitor): number {
        return visitor.visitSalariedEmployee(this);
    }

    getType(): string {
        return "Asalariado";
    }
}

// Empleado por horas
export class HourlyEmployee implements Employee {
    constructor(
        public id: string,
        public name: string,
        public hourlyRate: number,
        public hoursWorked: number,
        public telefono: string = "",
        public email: string = "",
        public especialidad: string = "",
        public cedula: string = "",
        public horario_inicio: string = "08:00",
        public horario_fin: string = "17:00",
        public duracion_cita: number = 30,
        public activo: boolean = true
    ) {}

    accept(visitor: EmployeeVisitor): number {
        return visitor.visitHourlyEmployee(this);
    }

    getType(): string {
        return "Por Horas";
    }
}

// Interfaz Visitor
export interface EmployeeVisitor {
    visitSalariedEmployee(employee: SalariedEmployee): number;
    visitHourlyEmployee(employee: HourlyEmployee): number;
}

// Implementación del Visitor para calcular salarios
export class SalaryCalculator implements EmployeeVisitor {
    visitSalariedEmployee(employee: SalariedEmployee): number {
        return employee.salary * employee.monthsWorked;
    }

    visitHourlyEmployee(employee: HourlyEmployee): number {
        return employee.hourlyRate * employee.hoursWorked;
    }
}
