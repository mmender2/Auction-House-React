import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../globalState/authSlice'
// import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    authReducer,
    //  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  },
})
