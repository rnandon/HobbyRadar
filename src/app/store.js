import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/UserSlice';
import tokenReducer from '../features/User/TokenSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
    },
});
