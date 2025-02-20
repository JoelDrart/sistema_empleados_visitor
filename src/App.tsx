// src/App.tsx
import React from "react";

import EmployeeCard from "./components/EmployeeCard";
import AddEmployeeCard from "./components/AddEmployeeCard";
import EmployeeModal from "./components/EmployeeModal";
import useEmployeeLogic from "./hooks/useEmployeeLogic";
import { SalaryCalculator } from "./models/Employee";

const App: React.FC = () => {
    const {
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
    } = useEmployeeLogic();

    const salaryCalculator = new SalaryCalculator();

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Sistema de Nómina de Empleados
                </h1>

                {/* 📌 Mensaje de error si hay problemas de conexión */}
                {dbConnectionError && (
                    <div className="bg-red-500 text-white p-3 rounded-md mb-4">
                        ⚠️ {dbConnectionError}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-600"></div>
                    </div>
                ) : (
                    <>
                        {employees.length === 0 ? (
                            <div className="text-center text-gray-500">
                                No hay empleados.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {employees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        onClick={() =>
                                            handleEditEmployee(employee)
                                        }
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
                        )}
                        <EmployeeModal
                            isOpen={isModalOpen}
                            employee={selectedEmployee}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSaveEmployee}
                            onDelete={handleDeleteEmployee}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
