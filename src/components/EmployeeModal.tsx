/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { SalariedEmployee, HourlyEmployee, Employee } from "../models/Employee";

interface EmployeeModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedEmployee: Employee) => void;
  onDelete: (employee: Employee) => void; // Nueva función para eliminar
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ employee, isOpen, onClose, onSave, onDelete }) => {
  if (!isOpen || !employee) return null;

  const [name, setName] = useState(employee.name);
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
      updatedEmployee = new SalariedEmployee(name, employee.salary, monthsWorked);
    } else {
      updatedEmployee = new HourlyEmployee(name, hourlyRate, hoursWorked);
    }

    onSave(updatedEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Empleado</h2>
        <span>Nombre: </span>
        <input
          className="w-full border p-2 mb-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {employee instanceof SalariedEmployee ? (
          <>
            <span>Meses trabajados: </span>
            <input
              className="w-full border p-2 mb-2"
              type="number"
              value={monthsWorked}
              onChange={(e) => setMonthsWorked(Number(e.target.value))}
            />
          </>
        ) : (
          <>
            <span>Pago/hora: </span>
            <input
              className="w-full border p-2 mb-2"
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
            />
            <span>Horas trabajadas: </span>
            <input
              className="w-full border p-2 mb-2"
              type="number"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(Number(e.target.value))}
            />
          </>
        )}

        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
            Guardar
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
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
