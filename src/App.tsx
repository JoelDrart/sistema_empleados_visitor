// src/App.tsx
import React, { useEffect, useState } from "react";
import {
    SalariedEmployee,
    HourlyEmployee,
    SalaryCalculator,
    Employee,
} from "./models/Employee";
import EmployeeCard from "./components/EmployeeCard";
import AddEmployeeCard from "./components/AddEmployeeCard";
import EmployeeModal from "./components/EmployeeModal";
import axios from "axios";
import { API_ROUTES } from "./config/api";
import {
    AddHourlyEmployeeDto,
    AddSalariedEmployeeDto,
    EmployeeResponseDto,
} from "./models/EmployeeDTO";

const App: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar el indicador de carga
    const salaryCalculator = new SalaryCalculator();

    async function fetchEmployees() {
        try {
            const response = await axios.get<EmployeeResponseDto[]>(
                API_ROUTES.GET_EMPLOYEES
            );
            setEmployees(
                () =>
                    response.data
                        .map((emp: EmployeeResponseDto) => {
                            // Ahora emp tiene un tipo definido
                            if (emp.type === "ASALARIADO" && emp.salaried) {
                                return new SalariedEmployee(
                                    emp.id,
                                    emp.name,
                                    emp.salaried.salary,
                                    emp.salaried.monthsWorked
                                );
                            } else if (emp.type === "POR_HORAS" && emp.hourly) {
                                return new HourlyEmployee(
                                    emp.id,
                                    emp.name,
                                    emp.hourly.hourlyRate,
                                    emp.hourly.hoursWorked
                                );
                            }
                            return null;
                        })
                        .filter((emp) => emp !== null) // Filtrar valores nulos
            );

            console.log("Employees fetched:", response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleSaveEmployee = async (updatedEmployee: Employee) => {
        //update
        try {
            if (updatedEmployee instanceof SalariedEmployee) {
                const updatedEmployeeDto: AddSalariedEmployeeDto = {
                    id: updatedEmployee.id,
                    name: updatedEmployee.name,
                    salary: updatedEmployee.salary,
                    monthsWorked: updatedEmployee.monthsWorked,
                };

                await axios.put(
                    `${API_ROUTES.UPDATE_SALARIED}/${updatedEmployeeDto.id}`,
                    updatedEmployeeDto
                );
            } else if (updatedEmployee instanceof HourlyEmployee) {
                const updatedEmployeeDto: AddHourlyEmployeeDto = {
                    id: updatedEmployee.id,
                    name: updatedEmployee.name,
                    hourlyRate: updatedEmployee.hourlyRate,
                    hoursWorked: updatedEmployee.hoursWorked,
                };

                await axios.put(
                    `${API_ROUTES.UPDATE_HOURLY}/${updatedEmployeeDto.id}`,
                    updatedEmployeeDto
                );
            }

            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp.id === updatedEmployee.id ? updatedEmployee : emp
                )
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    // Función para agregar empleados asalariados
    const handleAddSalaried = async () => {
        try {
            const newEmployeeDto: AddSalariedEmployeeDto = {
                id: crypto.randomUUID(),
                name: "Nuevo Asalariado",
                salary: 2500,
                monthsWorked: 1,
            };

            console.log("Nuevo asalariado: ", newEmployeeDto);

            await axios.post(API_ROUTES.CREATE_SALARIED, newEmployeeDto);

            const newEmployee = new SalariedEmployee(
                newEmployeeDto.id,
                newEmployeeDto.name,
                newEmployeeDto.salary,
                newEmployeeDto.monthsWorked
            );

            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        } catch (error) {
            console.error("Error adding salaried employee:", error);
        }
    };

    // Función para agregar empleados por horas
    const handleAddHourly = async () => {
        try {
            const newEmployeeDto: AddHourlyEmployeeDto = {
                id: crypto.randomUUID(),
                name: "Nuevo Por Hora",
                hourlyRate: 15,
                hoursWorked: 40,
            };

            await axios.post(API_ROUTES.CREATE_HOURLY, newEmployeeDto);

            const newEmployee = new HourlyEmployee(
                newEmployeeDto.id,
                newEmployeeDto.name,
                newEmployeeDto.hourlyRate,
                newEmployeeDto.hoursWorked
            );

            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        } catch (error) {
            console.error("Error adding hourly employee:", error);
        }
    };

    async function fetchDeleteEmployee(employee: Employee) {
        try {
            await axios.delete(`${API_ROUTES.DELETE_EMPLOYEE}/${employee.id}`);
            setEmployees((prevEmployees) =>
                prevEmployees.filter((emp) => emp !== employee)
            );
            console.log("Employee deleted:", employee);
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }

    const handleDeleteEmployee = (employee: Employee) => {
        fetchDeleteEmployee(employee);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Sistema de Nómina de Empleados
                </h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {employees.map((employee) => (
                                <div
                                    key={employee.id}
                                    onClick={() => handleEditEmployee(employee)}
                                >
                                    <EmployeeCard
                                        employee={employee}
                                        salary={employee.accept(
                                            salaryCalculator
                                        )}
                                    />
                                </div>
                            ))}
                            <AddEmployeeCard
                                onAddSalaried={handleAddSalaried}
                                onAddHourly={handleAddHourly}
                            />
                        </div>

                        <EmployeeModal
                            isOpen={isModalOpen}
                            employee={selectedEmployee}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSaveEmployee}
                            onDelete={handleDeleteEmployee} // Se pasa la función de eliminación
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
