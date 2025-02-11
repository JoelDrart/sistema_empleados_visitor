import React from "react";

interface AddEmployeeCardProps {
    onAddSalaried: () => void;
    onAddHourly: () => void;
}

const AddEmployeeCard: React.FC<AddEmployeeCardProps> = ({
    onAddSalaried,
    onAddHourly,
}) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center "> 
                <div
                    className="bg-white shadow-md rounded-lg p-6 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer mb-2"
                    onClick={onAddSalaried}
                >
                    <span className="text-gray-600 text-lg font-semibold">
                        + Agregar Empleado Asalariado
                    </span>
                </div>
                <div
                    className="bg-white shadow-md rounded-lg p-6 px-auto border border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
                    onClick={onAddHourly}
                >
                    <span className="text-gray-600 text-lg font-semibold">
                        + Agregar Empleado Por hora
                    </span>
                </div>
            </div>
        </>
    );
};

export default AddEmployeeCard;
