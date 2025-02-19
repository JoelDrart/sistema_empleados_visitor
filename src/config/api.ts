const API_URL = 'http://localhost:3000'; // Cambia esto si el backend está en otro puerto o en producción

export const API_ROUTES = {
  GET_EMPLOYEES: `${API_URL}/employees`,
  CREATE_SALARIED: `${API_URL}/employees/salaried`,
  CREATE_HOURLY: `${API_URL}/employees/hourly`,
  UPDATE_SALARIED: `${API_URL}/employees/salaried`,
  UPDATE_HOURLY: `${API_URL}/employees/hourly`,
  DELETE_EMPLOYEE: `${API_URL}/employees`,
};
