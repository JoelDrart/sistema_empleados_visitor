import { Employee, SalariedEmployee, HourlyEmployee } from "../models/Employee";
import empImg from "/emp-icon.svg";

interface EmployeeCardProps {
    employee: Employee;
    salary: number;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, salary }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-72 max-w-sm mx-auto">
            <img
                src={empImg}
                alt="Employee"
                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-blue-500"
            />
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                {employee.name}
            </h2>
            <p className="text-blue-600 text-center font-semibold">
                {employee.getType()}
            </p>

            {employee instanceof SalariedEmployee ? (
                <div className="mt-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Salario mensual: </span>
                        ${employee.salary}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">
                            Meses trabajados:{" "}
                        </span>
                        {employee.monthsWorked}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Salario: </span> $
                        {salary.toFixed(2)}
                    </p>
                </div>
            ) : employee instanceof HourlyEmployee ? (
                <div className="mt-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Pago por hora: </span>$
                        {employee.hourlyRate}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">
                            Horas trabajadas:{" "}
                        </span>
                        {employee.hoursWorked}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Salario: </span> $
                        {salary.toFixed(2)}
                    </p>
                </div>
            ) : null}

            <div className="flex justify-center mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                    Detalles
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;
