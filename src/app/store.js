import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/UserSlice';
import tokenReducer from '../features/User/TokenSlice';
import hobbiesReducer from '../features/Pages/Hobby/HobbySlice';
import eventsReducer from '../features/Pages/Event/EventSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
        hobbies: hobbiesReducer,
        events: eventsReducer,
    },
});
