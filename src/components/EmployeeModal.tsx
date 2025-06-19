/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { SalariedEmployee, HourlyEmployee, Employee } from "../models/Employee";

interface EmployeeModalProps {
    employee: Employee | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedEmployee: Employee) => void;
    onDelete: (employee: Employee) => void;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
    employee,
    isOpen,
    onClose,
    onSave,
    onDelete,
}) => {
    if (!isOpen || !employee) return null;

    const [name, setName] = useState(employee.name);
    const [telefono, setTelefono] = useState(employee.telefono);
    const [email, setEmail] = useState(employee.email);
    const [especialidad, setEspecialidad] = useState(employee.especialidad);
    const [cedula, setCedula] = useState(employee.cedula);
    const [horarioInicio, setHorarioInicio] = useState(employee.horario_inicio);
    const [horarioFin, setHorarioFin] = useState(employee.horario_fin);
    const [duracionCita, setDuracionCita] = useState(employee.duracion_cita);
    const [activo, setActivo] = useState(employee.activo);

    // Campos específicos según tipo de empleado
    const [monthsWorked, setMonthsWorked] = useState(
        employee instanceof SalariedEmployee ? employee.monthsWorked : 1
    );
    const [hourlyRate, setHourlyRate] = useState(
        employee instanceof HourlyEmployee ? employee.hourlyRate : 0
    );
    const [hoursWorked, setHoursWorked] = useState(
        employee instanceof HourlyEmployee ? employee.hoursWorked : 0
    );

    const handleSave = () => {
        let updatedEmployee: Employee;

        if (employee instanceof SalariedEmployee) {
            updatedEmployee = new SalariedEmployee(
                employee.id,
                name,
                employee.salary,
                monthsWorked,
                telefono,
                email,
                especialidad,
                cedula,
                horarioInicio,
                horarioFin,
                duracionCita,
                activo
            );
        } else {
            updatedEmployee = new HourlyEmployee(
                employee.id,
                name,
                hourlyRate,
                hoursWorked,
                telefono,
                email,
                especialidad,
                cedula,
                horarioInicio,
                horarioFin,
                duracionCita,
                activo
            );
        }

        onSave(updatedEmployee);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Editar Empleado</h2>

                {/* Campos comunes */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nombre:
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Teléfono:
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email:
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Especialidad:
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="text"
                            value={especialidad}
                            onChange={(e) => setEspecialidad(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Cédula:
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Horario Inicio:
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="time"
                            value={horarioInicio}
                            onChange={(e) => setHorarioInicio(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Horario Fin:
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="time"
                            value={horarioFin}
                            onChange={(e) => setHorarioFin(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Duración Cita (min):
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="number"
                            value={duracionCita}
                            onChange={(e) =>
                                setDuracionCita(Number(e.target.value))
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Estado:
                        </label>
                        <select
                            className="w-full border p-2 mb-2 rounded"
                            value={activo.toString()}
                            onChange={(e) =>
                                setActivo(e.target.value === "true")
                            }
                        >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                    </div>
                </div>

                {/* Campos específicos según tipo de empleado */}
                {employee instanceof SalariedEmployee ? (
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Meses trabajados:
                        </label>
                        <input
                            className="w-full border p-2 mb-2 rounded"
                            type="number"
                            value={monthsWorked}
                            onChange={(e) =>
                                setMonthsWorked(Number(e.target.value))
                            }
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Pago/hora:
                            </label>
                            <input
                                className="w-full border p-2 mb-2 rounded"
                                type="number"
                                value={hourlyRate}
                                onChange={(e) =>
                                    setHourlyRate(Number(e.target.value))
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Horas trabajadas:
                            </label>
                            <input
                                className="w-full border p-2 mb-2 rounded"
                                type="number"
                                value={hoursWorked}
                                onChange={(e) =>
                                    setHoursWorked(Number(e.target.value))
                                }
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        Guardar
                    </button>
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => {
                            onDelete(employee);
                            onClose();
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeModal;
