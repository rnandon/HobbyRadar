import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    value: "",
};

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, tags) => {
            // used to locally store all hobbies
            state.value = tags;
        }
    }
})

export const { setTags } = tagsSlice.actions;

export default tagsSlice.reducer;
