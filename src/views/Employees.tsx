// src/views/Employees.tsx
import AddEmployeeCard from "../components/AddEmployeeCard";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeModal from "../components/EmployeeModal";
import useEmployeeLogic from "../hooks/useEmployeeLogic";
import { SalaryCalculator } from "../models/Employee";

export default function Employees() {
    const {
        employees,
        dbConnectionError,
        loading,
        selectedEmployee,
        isModalOpen,
        isAdding, // Añadir esta línea
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
                        {isAdding && (
                            <div className="fixed top-4 right-4 bg-white p-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                <span className="text-sm text-gray-600">
                                    Agregando empleado...
                                </span>
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <AddEmployeeCard
                                onAddSalaried={handleAddSalaried}
                                onAddHourly={handleAddHourly}
                                disabled={isAdding}
                            />

                            {employees.length === 0 ? (
                                <div className="text-center text-gray-500 col-span-2">
                                    No hay empleados registrados.
                                </div>
                            ) : (
                                employees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        onClick={() =>
                                            handleEditEmployee(employee)
                                        }
                                        className={
                                            isAdding
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                        }
                                    >
                                        <EmployeeCard
                                            employee={employee}
                                            salary={employee.accept(
                                                salaryCalculator
                                            )}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
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
}
