import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "",
    status: "not logged in",
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, user) => {
            state.value = user;
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;