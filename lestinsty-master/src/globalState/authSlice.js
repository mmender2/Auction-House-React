import { createSlice } from '@reduxjs/toolkit'
import { InitialState } from './InitialState'

const authSlice = createSlice({
  name: 'authSlice',
  initialState: InitialState,
  reducers: {
    setCurrentUserData: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logoutUser: (state, action) => {
      state.isAuthenticated = false
      state.user = {}
    },
  },
})

export const { setCurrentUserData, logoutUser } = authSlice.actions

export const authReducer = authSlice.reducer
