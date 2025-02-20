// src/hooks/useEmployeeLogic.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../config/api";
import {
    SalariedEmployee,
    HourlyEmployee,
    Employee,
} from "../models/Employee";
import {
    AddHourlyEmployeeDto,
    AddSalariedEmployeeDto,
    EmployeeResponseDto,
} from "../models/EmployeeDTO";
import useEmployeeStore from "../store/employeeStore";

const useEmployeeLogic = () => {
    const {
        employees,
        loading,
        dbConnectionError,
        setEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        setLoading,
        setdbConnectionError,
    } = useEmployeeStore();

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const errorDB = "Error de conexión con el servidor. Intente de nuevo más tarde.";


    // Función para obtener empleados
    const fetchEmployees = async () => {
        try {
            const response = await axios.get<EmployeeResponseDto[]>(
                API_ROUTES.GET_EMPLOYEES
            );
            const fetchedEmployees = response.data
                .map((emp: EmployeeResponseDto) => {
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
                .filter((emp) => emp !== null) as Employee[];

            setEmployees(fetchedEmployees);
            setdbConnectionError("");
            console.log("Employees fetched:", response.data);
        } catch (error) {
            setdbConnectionError(errorDB);
            console.error("Error fetching employees:", error);
            
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar empleados al inicio
    useEffect(() => {
        fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Función para editar un empleado
    const handleEditEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    // Función para guardar un empleado actualizado
    const handleSaveEmployee = async (updatedEmployee: Employee) => {
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

            updateEmployee(updatedEmployee);
            setdbConnectionError("");
            setIsModalOpen(false);
        } catch (error) {
            setdbConnectionError(errorDB);
            console.error("Error updating employee:", error);
        }
    };

    // Función para agregar un empleado asalariado
    const handleAddSalaried = async () => {
        try {
            const newEmployeeDto: AddSalariedEmployeeDto = {
                id: crypto.randomUUID(),
                name: "Nuevo Asalariado",
                salary: 2500,
                monthsWorked: 1,
            };

            await axios.post(API_ROUTES.CREATE_SALARIED, newEmployeeDto);

            const newEmployee = new SalariedEmployee(
                newEmployeeDto.id,
                newEmployeeDto.name,
                newEmployeeDto.salary,
                newEmployeeDto.monthsWorked
            );
            setdbConnectionError("");
            addEmployee(newEmployee);
        } catch (error) {
            setdbConnectionError(errorDB);
            console.error("Error adding salaried employee:", error);
        }
    };

    // Función para agregar un empleado por horas
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

            addEmployee(newEmployee);
            setdbConnectionError("");
        } catch (error) {
            setdbConnectionError(errorDB);
            console.error("Error adding hourly employee:", error);
        }
    };

    // Función para eliminar un empleado
    const handleDeleteEmployee = async (employee: Employee) => {
        try {
            await axios.delete(`${API_ROUTES.DELETE_EMPLOYEE}/${employee.id}`);
            deleteEmployee(employee.id);
            setIsModalOpen(false);
        } catch (error) {
            setdbConnectionError(errorDB);
            console.error("Error deleting employee:", error);
        }
    };

    return {
        employees,
        dbConnectionError,
        loading,
        selectedEmployee,
        isModalOpen,
        setIsModalOpen,
        handleEditEmployee,
        handleSaveEmployee,
        handleAddSalaried,
        handleAddHourly,
        handleDeleteEmployee,
    };
};

export default useEmployeeLogic;