import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "",
};

export const hobbiesSlice = createSlice({
    name: 'hobbies',
    initialState,
    reducers: {
        setHobbies: (state, hobbies) => {
            // used to locally store all hobbies
            state.value = hobbies;
        }
    }
})

export const { setHobbies } = hobbiesSlice.actions;

export default hobbiesSlice.reducer;