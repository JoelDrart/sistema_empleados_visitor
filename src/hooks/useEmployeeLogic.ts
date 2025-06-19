// src/hooks/useEmployeeLogic.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../config/api";
import { SalariedEmployee, HourlyEmployee, Employee } from "../models/Employee";
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

    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const errorDB =
        "Error de conexión con el servidor. Intente de nuevo más tarde.";

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
                            emp.salaried.monthsWorked,
                            emp.telefono,
                            emp.email,
                            emp.especialidad,
                            emp.cedula,
                            emp.horario_inicio,
                            emp.horario_fin,
                            emp.duracion_cita,
                            emp.activo
                        );
                    } else if (emp.type === "POR_HORAS" && emp.hourly) {
                        return new HourlyEmployee(
                            emp.id,
                            emp.name,
                            emp.hourly.hourlyRate,
                            emp.hourly.hoursWorked,
                            emp.telefono,
                            emp.email,
                            emp.especialidad,
                            emp.cedula,
                            emp.horario_inicio,
                            emp.horario_fin,
                            emp.duracion_cita,
                            emp.activo
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
                    telefono: updatedEmployee.telefono,
                    email: updatedEmployee.email,
                    especialidad: updatedEmployee.especialidad,
                    cedula: updatedEmployee.cedula,
                    horario_inicio: updatedEmployee.horario_inicio,
                    horario_fin: updatedEmployee.horario_fin,
                    duracion_cita: updatedEmployee.duracion_cita,
                    activo: updatedEmployee.activo,
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
                    telefono: updatedEmployee.telefono,
                    email: updatedEmployee.email,
                    especialidad: updatedEmployee.especialidad,
                    cedula: updatedEmployee.cedula,
                    horario_inicio: updatedEmployee.horario_inicio,
                    horario_fin: updatedEmployee.horario_fin,
                    duracion_cita: updatedEmployee.duracion_cita,
                    activo: updatedEmployee.activo,
                };

                await axios.put(
                    `${API_ROUTES.UPDATE_HOURLY}/${updatedEmployeeDto.id}`,
                    updatedEmployeeDto
                );
            }

            // Actualizamos la lista completa después de la modificación
            await fetchEmployees();
            setdbConnectionError("");
            setIsModalOpen(false);
        } catch (error) {
            setdbConnectionError(errorDB);
            console.error("Error updating employee:", error);
        }
    };

    // Función para agregar un empleado asalariado
    const handleAddSalaried = async (name: string) => {
        setIsAdding(true);
        try {
            const newEmployeeDto: AddSalariedEmployeeDto = {
                id: crypto.randomUUID(),
                name,
                salary: 2500,
                monthsWorked: 1,
                telefono: "000-000-0000",
                email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
                especialidad: "General",
                cedula: "000-0000000-0",
                horario_inicio: "08:00",
                horario_fin: "17:00",
                duracion_cita: 30,
                activo: true,
            };

            await axios.post(API_ROUTES.CREATE_SALARIED, newEmployeeDto);
            await fetchEmployees(); // Actualizamos la lista desde el servidor
            setdbConnectionError("");
        } catch (error) {
            setdbConnectionError(errorDB);
            console.error("Error adding salaried employee:", error);
        } finally {
            setIsAdding(false);
        }
    };

    // Función para agregar un empleado por horas
    const handleAddHourly = async (name: string) => {
        setIsAdding(true);
        try {
            const newEmployeeDto: AddHourlyEmployeeDto = {
                id: crypto.randomUUID(),
                name,
                hourlyRate: 15,
                hoursWorked: 40,
                telefono: "000-000-0000",
                email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
                especialidad: "General",
                cedula: "000-0000000-0",
                horario_inicio: "08:00",
                horario_fin: "17:00",
                duracion_cita: 30,
                activo: true,
            };

            await axios.post(API_ROUTES.CREATE_HOURLY, newEmployeeDto);
            await fetchEmployees(); // Actualizamos la lista desde el servidor
            setdbConnectionError("");
        } catch (error) {
            setdbConnectionError(errorDB);
            console.error("Error adding hourly employee:", error);
        } finally {
            setIsAdding(false);
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
        isAdding,
        setIsModalOpen,
        handleEditEmployee,
        handleSaveEmployee,
        handleAddSalaried,
        handleAddHourly,
        handleDeleteEmployee,
    };
};

export default useEmployeeLogic;
