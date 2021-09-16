import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "",
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, token) => {
            state.value = token;
        }
    }
})

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;