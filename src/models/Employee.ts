
// Interfaz base para empleados
export interface Employee {
    accept(visitor: EmployeeVisitor): number;
    name: string;
    getType(): string; // Método para obtener el tipo de empleado
  }
  
  // Empleado asalariado
  export class SalariedEmployee implements Employee {
    constructor(public name: string, public salary: number, public monthsWorked: number = 1) {}

    accept(visitor: EmployeeVisitor): number {
      return visitor.visitSalariedEmployee(this);
    }
  
    getType(): string {
      return "Asalariado";
    }
  }
  
  // Empleado por horas
  export class HourlyEmployee implements Employee {
    constructor(public name: string, public hourlyRate: number, public hoursWorked: number) {}

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
  