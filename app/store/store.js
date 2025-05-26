import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employeeSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les dates dans le state
        ignoredActions: ['employees/setEmployees'],
        ignoredPaths: ['employees.employees.dateOfBirth', 'employees.employees.startDate'],
      },
    }),
});