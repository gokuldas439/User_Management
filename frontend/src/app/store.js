import { configureStore } from '@reduxjs/toolkit'
import adminAuthReducer from '../features/auth/adminAuthReducer'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin:adminAuthReducer,
    goals: goalReducer,
  },
})
