import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "",
};

export const recommendationSlice = createSlice({
    name: 'recommendations',
    initialState,
    reducers: {
        setRecommendations: (state, recommendations) => {
            state.value = recommendations;
        }
    }
})

export const { setRecommendations } = recommendationSlice.actions;

export default recommendationSlice.reducer;