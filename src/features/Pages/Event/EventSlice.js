import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: "",
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, events) => {
            // used to locally store all events
            state.value = events;
        }
    }
})

export const { setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;