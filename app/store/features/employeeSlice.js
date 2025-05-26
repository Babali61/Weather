import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: JSON.parse(localStorage.getItem('employees')) || [],
  loading: false,
  error: null,
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addEmployee, setEmployees, setLoading, setError } = employeeSlice.actions;

// Sélecteurs
export const selectEmployees = (state) => state.employees.employees;
export const selectLoading = (state) => state.employees.loading;
export const selectError = (state) => state.employees.error;

export default employeeSlice.reducer;