// src/App.tsx
import React, { useState } from "react";
import { SalariedEmployee, HourlyEmployee, SalaryCalculator, Employee } from "./models/Employee";
import EmployeeCard from "./components/EmployeeCard";
import AddEmployeeCard from "./components/AddEmployeeCard";
import EmployeeModal from "./components/EmployeeModal";

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const salaryCalculator = new SalaryCalculator();

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (updatedEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => (emp.name === selectedEmployee?.name ? updatedEmployee : emp))
    );
    setIsModalOpen(false);
  };

  const handleAddSalaried = () => {
    const newEmployee = new SalariedEmployee("Asalariado", 2500);
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const handleAddHourly = () => {
    const newEmployee = new HourlyEmployee("Por Hora", 15, 40);
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp !== employee));
    setIsModalOpen(false);
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema de Nómina</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {employees.map((employee, index) => (
          <div key={index} onClick={() => handleEditEmployee(employee)}>
            <EmployeeCard employee={employee} salary={employee.accept(salaryCalculator)} />
          </div>
        ))}
        <AddEmployeeCard onAddSalaried={handleAddSalaried} onAddHourly={handleAddHourly} />
      </div>

      <EmployeeModal
  isOpen={isModalOpen}
  employee={selectedEmployee}
  onClose={() => setIsModalOpen(false)}
  onSave={handleSaveEmployee}
  onDelete={handleDeleteEmployee} // Se pasa la función de eliminación
/>

    </div>
  );
};

export default App;
