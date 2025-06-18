import React from "react";

interface AddEmployeeCardProps {
    onAddSalaried: (name: string) => void;
    onAddHourly: (name: string) => void;
    disabled?: boolean;
}

const AddEmployeeCard: React.FC<AddEmployeeCardProps> = ({
    onAddSalaried,
    onAddHourly,
    disabled,
}) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center ">
                <div
                    className={`bg-white shadow-md rounded-lg p-6 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer mb-2 ${
                        disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                        !disabled && onAddSalaried("New Salaried Employee")
                    }
                >
                    <span className="text-gray-600 text-lg font-semibold">
                        + Agregar Empleado Asalariado
                    </span>
                </div>
                <div
                    className={`bg-white shadow-md rounded-lg p-6 px-auto border border-dashed border-gray-400 flex items-center justify-center cursor-pointer ${
                        disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                        !disabled && onAddHourly("New Hourly Employee")
                    }
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
