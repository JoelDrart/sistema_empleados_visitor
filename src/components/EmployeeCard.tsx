
import { Employee } from "../models/Employee";
import empImg from "/emp-icon.svg"

interface EmployeeCardProps {
  employee: Employee;
  salary: number;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, salary }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <img src={empImg} alt="Employee" className="w-24 h-24 mx-auto mb-4" />
      <h2 className="text-lg font-bold">{employee.name}</h2>
      <p className="text-blue-600 font-semibold">{employee.getType()}</p>
      <p className="text-gray-600">Salario: ${salary.toFixed(2)}</p>
    </div>
  );
};

export default EmployeeCard;
